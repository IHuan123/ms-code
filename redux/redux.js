//用于校验是否是纯对象
import isPlainObject from'lodash/isPlainObject'
//内部私有属性，暂时不做扩展
import $$observable from'symbol-observable'

//内部action,用于调用所有reducers生成初始state
export const ActionTypes ={INIT:'@@redux/INIT'}


/**
 * 
 * @param {*} reducer 一个函数 接受两个参数（state,action）返回的action对象
 * @param {*} preloadedState state的初始值
 * @param {*} enhancer //一个方法
 */

export default function createStore(reducer, preloadedState, enhancer) {
    if (typeof preloadedState ==='function' && typeof enhancer ==='undefined') {
        enhancer = preloadedState
        preloadedState = undefined
    }
    if (typeof enhancer !=='undefined') {
        if (typeof enhancer !=='function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        //enhancer提供增强版(中间件扩展)的store
        return enhancer(createStore)(reducer, preloadedState) 
    }
    //reducer必须是一个function
    if (typeof reducer !=='function') {
        throw new Error('Expected the reducer to be a function.')
    }
    //store内部私有变量(外部无法直接访问)
    var currentReducer = reducer        //把 reducer 赋值给 currentReducer
    var currentState = preloadedState   //把 preloadedState 赋值给 currentState
    var currentListeners = []           //初始化 listeners 数组
    var nextListeners = currentListeners//nextListeners 和 currentListeners 指向同一个引用
    var isDispatching = false           //标记正在进行dispatch

    //为下一阶段监听器快照提供备份
    function ensureCanMutateNextListeners () {
        //判断 nextListeners 和 currentListeners 是同一个引用
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice() //克隆 不能直接赋值
        }
    }

    //获取最新state
    function getState() {
        return currentState
    }

    //用于订阅state的更新
    function subscribe(listener) {
        if (typeof listener !=='function') {
            throw new Error('Expected listener to be a function.')
        }
        //保证只有第一次执行unsubscribe()才是有效的，只取消注册当前listener
        let isSubscribed =true
        //为每次订阅提供快照备份nextListeners，主要防止在遍历执行currentListeners回调
        //过程中触发了订阅/取消订阅功能，若直接更新currentListeners将造成当前循环体逻辑混乱
        //因此所有订阅/取消订阅的listeners都是在nextListeners中存储的，并不会影响当前的dispatch(action)
        ensureCanMutateNextListeners()
        nextListeners.push(listener)
        //返回一个取消订阅的函数
        return function unsubscribe() {
            //保证当前listener只被取消注册一次
            if (!isSubscribed) { return }
            isSubscribed =false
            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index,1)
        }
    }

    function dispatch(action) {
        //保证dispatch是个纯对象，即字面量对象或Object创建的对象
        //这是因为原始版的dispatch只支持同步action，约定的格式是纯对象
        //可以使用中间件来dispatch扩展功能，增加action的类型种类
        if (!isPlainObject(action)) {
            throw new Error('Actions must be plain objects. '+'Use custom middleware for async actions.')
        }
        //action必须要有key为type的动作类型
        if (typeof action.type ==='undefined') {
            throw new Error('Actions may not have an undefined "type" property. '+'Have you misspelled a constant?')
        }
        //判断在执行dispatch的过程中是否已存在dispatch的执行流
        //保证dispatch中对应的reducer不允许有其他dispatch操作
        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }
        try {
            //根据提供的action，执行根reducer从而更新整颗状态树
            isDispatching = true
            currentState = currentReducer(currentState, action)
        } finally {
            isDispatching = false
        }
        //通知所有之前通过subscribe订阅state更新的回调listener
        const listeners = currentListeners = nextListeners
        for(let i =0; i < listeners.length; i++) {
            const listener = listeners[i];  //每次执行dispatch都触发subscribed
            listener()
        }
        return action
    }


    //替换当前reducers，如从其他文件引入了新的reducers进行热加载
    function replaceReducer (nextReducer) {
        // 如果参数 nextReducer 不是纯函数，则报错
        if (typeof nextReducer !=='function') {
            throw new Error('Expected the nextReducer to be a function.')
        }
        // 替换 Reducer
        //当前传入的 nextReducer 赋值给 currentReducer
        currentReducer = nextReducer

        //调用 dispatch 函数，传入默认的 action
        dispatch({ type: ActionTypes.INIT })
    }

    function observable () {
        const outerSubscribe = subscribe
        return {
            subscribe (observer) {
                if (typeof observer !=='object') {
                    throw new TypeError('Expected the observer to be an object.')
                }
            
                function observeState() {
                    if (observer.next) {
                        observer.next(getState())
                    }
                }
                observeState()
                const unsubscribe = outerSubscribe(observeState)
                return { unsubscribe }
            },
            [$$observable] () {
                return this
            }
        }
    }

    dispatch({ type: ActionTypes.INIT })
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    }
}
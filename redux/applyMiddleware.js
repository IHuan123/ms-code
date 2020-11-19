import compose from './compose.js'

//以redux-thunk为例
export default function applyMiddleware (...middlewares) { //middlewares = [createThunkMiddleware] createThunkMiddleware为redux-thunk方法
    return (next) => { //next==createStore
        return (reducer,initialState)=>{
            var store = next(reducer, initialState);
            var dispatch = store.dispatch;//拿到真正的 dispatch
            var chain =[];
            //中间件所需参数
            var middlewareAPI = {
                getState: store.getState,
                dispatch:(action)=>dispatch(action)
            };
            chain = middlewares.map(middleware =>middleware(middlewareAPI)); 
            dispatch = compose(...chain, store.dispatch);//多个函数组合起来

            return {
                ...store,
                dispatch
            };
        }
    }
    // return (next) => (reducer, initialState) => {
    //     var store = next(reducer, initialState);
    //     var dispatch = store.dispatch;
    //     var chain =[];
    //     var middlewareAPI = {
    //         getState: store.getState, 
    //         dispatch:(action)=>dispatch(action)
    //     };
    //     chain = middlewares.map(middleware =>middleware(middlewareAPI)); 
    //     dispatch = compose(...chain, store.dispatch);
    //     return {
    //         ...store,
    //         dispatch
    //     };
    // };
}
return function combination (state ={}, action){
    let hasChanged = false
    const nextState ={}
    for (let i =0; i < finalReducerKeys.length; i++) {
        const key = finalReducerKeys[i]
        const reducer = finalReducers[key]
        //存储对应reducer的入参旧的state
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        //reducer必须要有返回值
        if (typeof nextStateForKey ==='undefined') {
            const errorMessage = getUndefinedStateErrorMessage(key, action)
            throw newError(errorMessage)
        }
        nextState[key]= nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
 }
    return hasChanged ? nextState : state
}
 
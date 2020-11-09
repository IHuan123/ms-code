function createThunkMiddleware(extraArgument) {
  //   return ({ dispatch, getState }) => (next) => (action) => {
  //     if (typeof action === 'function') {
  //       return action(dispatch, getState, extraArgument);
  //     }
  
  //     return next(action);
  //   };
    return ({ dispatch, getState })=>{
      return (next)=>{//next 在存在多个中间件为dispatch包装后的函数，如果没有next为dispatch
        return (action)=>{
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);        
        }
      }
    }
  }

  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;
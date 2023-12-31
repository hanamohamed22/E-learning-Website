import {createContext, useReducer,useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action)=> {
    switch (action.type){
        case 'LOGIN': 
        //console.log(action.payload)
            return {user: action.payload}
        case 'LOGOUT':
            window.location.href='/';
            return {user:null}
           
        default:
            return state
    }
}



export const AuthContextProvider =({children})=> {
    const [state,dispatch]= useReducer(authReducer, {
        user:null
    })
    console.log('AuthContext state', state)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])
    return(
        //provides our state value to entire app
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
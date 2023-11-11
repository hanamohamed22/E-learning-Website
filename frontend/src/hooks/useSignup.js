import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [user, setUser] = useState({});
  const { dispatch } = useAuthContext()

  const signup = async (username, email, password,firstname, lastname,gender) => {
    setIsLoading(true)
    setError(null)
    // console.log(username)
    // console.log(email)
    // console.log(password)
    // console.log(firstname)
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password,firstname, lastname,gender })
    })
   // console.log("da response elusesignup")
    //console.log(response)
    const json = await response.json()
   // console.log("da json elusesignup")
    console.log(json)
    setUser(json)
    console.log(response.ok)
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

       return json;
    }
  }
  //console.log(signup)

  return { signup, isLoading, error,user }
}
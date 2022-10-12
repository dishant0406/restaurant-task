import React, { createContext, useEffect, useState } from 'react'
import { useCookieState } from "use-cookie-state";

const StateContext = createContext()

const ContextProvider = ({children}) => {
  
  const [user, setUser] = useCookieState("user",null)
  const [bookmarked,setBookmarked] = useCookieState("bookmarked",[])
  const [addedRes,setAddedRes] = useCookieState("addedres",[])

  return (
    <StateContext.Provider 
    value={{ user:typeof user === 'string'?JSON.parse(user):user,
       setUser, 
       bookmarked:typeof bookmarked==='string'?JSON.parse(bookmarked):bookmarked, 
       setBookmarked, 
       addedRes:typeof addedRes === 'string'?JSON.parse(addedRes):addedRes,
        setAddedRes }}>
      {children}
    </StateContext.Provider>
  )
}

export {StateContext}
export default ContextProvider
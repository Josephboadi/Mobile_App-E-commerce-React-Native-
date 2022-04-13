import React, { useEffect, useReducer, userEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"

import authReducers from "../reducers/Auth.reducers"
import { setCurrentUser } from "../actions/Auth.actions"
import AuthGlobal from "./AuthGlobal"

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducers, {
    isAthenticated: null,
    user: {},
  })
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage : ""
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)))
      }
    }
    return () => setShowChild(false)
  }, [])

  if (!showChild) {
    return null
  } else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.children}
      </AuthGlobal.Provider>
    )
  }
}

export default Auth

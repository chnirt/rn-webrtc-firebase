
import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import _ from 'lodash'

import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocument } from "../../firebase/service";
// import { Loading } from '../../components'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const loading = false
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(
    async (fbUser) => {
      try {
        // loading.show()
        const foundUser = await getDocument('users', fbUser.uid)
        setUser({ ...fbUser, ...foundUser })
      } catch (error) {
      } finally {
        // loading.hide()
      }
    },
    [loading]
  )

  const debounceFetchUser = _.debounce(fetchUser, 1000)

  useEffect(() => {
    onAuthStateChanged(
      auth,
      async (fbUser) => {
        if (fbUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid
          if (user === null) {
            debounceFetchUser(fbUser)
          }
          // ...
        } else {
          // User is signed out
          // ...
        }
      },
      (error) => {
        handleError(error)
      },
      () => { }
    )
  }, [user, debounceFetchUser])

  const value = useMemo(() => ({
    isAuth: !!user ?? false,
    user,
  }), [user])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
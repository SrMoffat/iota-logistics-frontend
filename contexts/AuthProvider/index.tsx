import React, { createContext, useContext, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { useBrowserStorage } from '../../lib/hooks';
import { GENERAL_CONSTANTS } from '../../lib/constants';
import { signupUser, loginUser } from '../../lib/users';
import { UserData, UserDetails, LoggedInUserDetails, UserLoginDetails } from '../../lib/types';

type AuthProviderProps = {
  user: UserData;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  logout: () => void;
  signup: (details: UserDetails) => Promise<void>
  login: (details: UserLoginDetails) => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>
}

const AuthContext = createContext<Partial<AuthProviderProps>>({})

export const useAuthContext = (): Partial<AuthProviderProps> => useContext(AuthContext)

type UserStorage = LoggedInUserDetails | null

const AuthProvider = ({ children }) => {
  const [localUser, setLocalUser, removeLocalUser] = useBrowserStorage<UserStorage>(
    GENERAL_CONSTANTS.USER_STORAGE_KEY,
    'local'
  )
  const [sessionUser, setSessionUser, removeSessionUser] = useBrowserStorage<UserStorage>(
    GENERAL_CONSTANTS.USER_STORAGE_KEY,
    'session'
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [user, setUser] = useState(sessionUser?.user || localUser?.user)

  const persistUser = (data: UserStorage, rememberMe?: boolean) => {
    rememberMe ? setLocalUser(data) : setSessionUser(data)
    setUser(data?.user)
  }

  const logout = () => {
    removeLocalUser()
    removeSessionUser()
    setIsAuthenticated(false)
    setUser(undefined)
  }

  const login = async (details: UserLoginDetails) => {
    try {
      const response = await loginUser(details);
      persistUser(response, true);
    } catch (error) {
      throw error
    }
  }

  const signup = async (details: UserDetails) => {
    try {
      const results = await signupUser(details);
      persistUser(results)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (user?.confirmed) {
      setIsAuthenticated(true)
      if (localUser?.user && !isEqual(localUser?.user, user)) {
        setLocalUser({ jwt: localUser.jwt, user })
      }
      if (sessionUser?.user && !isEqual(sessionUser?.user, user)) {
        setSessionUser({ jwt: sessionUser.jwt, user })
      }
    } else {
      setIsAuthenticated(false)
    }
    setIsAuthenticating(false)
    // eslint-disable-next-line
  }, [user])
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthenticating,
        signup,
        logout,
        setUser,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

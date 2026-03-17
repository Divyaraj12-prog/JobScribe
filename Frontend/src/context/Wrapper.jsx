import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

const Wrapper = (props) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default Wrapper
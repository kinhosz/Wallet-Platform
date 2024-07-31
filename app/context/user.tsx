import { createContext, useContext } from 'react';

export const UserContext = createContext({});

export const useUser = () => {
  return useContext(UserContext);
};

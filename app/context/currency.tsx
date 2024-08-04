import { createContext, useContext } from 'react';

export const CurrencyContext = createContext('BRL');

export const useCurrency = () => {
  return useContext(CurrencyContext);
};

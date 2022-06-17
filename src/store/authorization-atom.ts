import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { atomWithStorage } from 'jotai/utils';

export function checkIsLoggedIn() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoggedIn());

interface StockAuth {
  auth:boolean;
}

export const defaultStockAuth: StockAuth = {
  auth: false
};

// Original atom.
export const stockAuthAtom = atomWithStorage('', defaultStockAuth);
export const clearStockAuthAtom = atom(null, (_get, set, _data) => {
  return set(stockAuthAtom, defaultStockAuth);
});

export const stockAuthBooleanAtom = atom(
  (get) => get(stockAuthAtom).auth,
  (get, set, data: boolean) => {
    const prev = get(stockAuthAtom);
    return set(stockAuthAtom, { ...prev, auth: data });
  }
);
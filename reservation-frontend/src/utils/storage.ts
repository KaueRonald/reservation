'use client'
import Cookies from 'js-cookie';

function getStorage(key: string) {
  if (typeof window !== 'undefined') {
    return Cookies.get(key);
  }
  return null;
}

function clearStorage() {
  Cookies.remove('token')
}

export { getStorage, clearStorage };


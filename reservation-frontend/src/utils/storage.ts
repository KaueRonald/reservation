'use client'
function getStorage(key: string) {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

function setStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
}

function clearStorage() {
    sessionStorage.clear();
}

export { getStorage, setStorage, clearStorage };


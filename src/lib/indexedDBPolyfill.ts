// Polyfill for indexedDB during SSR to prevent WalletConnect errors
if (typeof window === 'undefined') {
  // Server-side: create minimal stub
  global.indexedDB = {
    open: () => ({
      onsuccess: null,
      onerror: null,
      result: null,
    }),
  } as any;
}

export {};

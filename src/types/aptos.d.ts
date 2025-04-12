
declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string; publicKey: string }>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      account: () => Promise<{ address: string; publicKey: string }>;
      signAndSubmitTransaction: (transaction: any) => Promise<{ hash: string }>;
      signTransaction: (transaction: any) => Promise<any>;
      signMessage: (message: { message: string; nonce: string }) => Promise<{
        signature: string;
        fullMessage: string;
      }>;
    };
  }
}

export {};

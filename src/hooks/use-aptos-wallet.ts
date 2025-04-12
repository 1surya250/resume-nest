
import { useState, useEffect } from "react";
import { aptosClient } from "@/lib/aptos-client";
import { useToast } from "@/components/ui/use-toast";

type WalletInfo = {
  address: string;
  balance: string;
  isConnected: boolean;
};

export function useAptosWallet() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: "",
    balance: "0",
    isConnected: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if Petra wallet is installed
  const checkWalletInstalled = (): boolean => {
    return window.aptos !== undefined;
  };

  // Connect to wallet
  const connectWallet = async () => {
    if (!checkWalletInstalled()) {
      toast({
        title: "Wallet not found",
        description: "Please install the Petra wallet extension",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // Connect to the wallet
      const response = await window.aptos.connect();
      const address = response.address;
      
      // Get balance
      const balance = await aptosClient.getAccountResources(address)
        .then(resources => {
          const accountResource = resources.find(
            r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
          );
          return (accountResource?.data as any)?.coin?.value || "0";
        })
        .catch(() => "0");

      setWalletInfo({
        address,
        balance,
        isConnected: true,
      });

      toast({
        title: "Wallet connected",
        description: `Connected to address: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet",
        variant: "destructive",
      });
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletInfo({
      address: "",
      balance: "0",
      isConnected: false,
    });
    toast({
      title: "Wallet disconnected",
    });
  };

  return {
    walletInfo,
    isLoading,
    connectWallet,
    disconnectWallet,
    isWalletInstalled: checkWalletInstalled(),
  };
}


import { AptosClient } from "aptos";

// Default to devnet for development
const APTOS_NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";

// Initialize Aptos client
export const aptosClient = new AptosClient(APTOS_NODE_URL);

// Helper functions for common Aptos operations
export const getAccountResources = async (accountAddress: string) => {
  try {
    return await aptosClient.getAccountResources(accountAddress);
  } catch (error) {
    console.error("Failed to fetch account resources:", error);
    throw error;
  }
};

export const getAccountBalance = async (accountAddress: string) => {
  try {
    const resources = await aptosClient.getAccountResources(accountAddress);
    const coinResource = resources.find(
      (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
    );
    // Use type assertion to handle the data structure correctly
    return coinResource?.data ? (coinResource.data as any).coin?.value || "0" : "0";
  } catch (error) {
    console.error("Failed to fetch account balance:", error);
    return "0";
  }
};

// Function to format Aptos balance to a more readable format
export const formatAptosBalance = (balance: string): string => {
  // Convert from octas (10^-8) to APT
  const apt = Number(balance) / 100000000;
  return apt.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

// Helper to create simple transaction payloads
export const createTransactionPayload = (module: string, func: string, args: any[] = []) => {
  return {
    type: "entry_function_payload",
    function: module,
    type_arguments: [],
    arguments: args,
  };
};


import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";

type AptosWalletButtonProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function AptosWalletButton({ variant = "outline" }: AptosWalletButtonProps) {
  const { walletInfo, connectWallet, disconnectWallet, isLoading, isWalletInstalled } = useAptosWallet();

  if (!isWalletInstalled) {
    return (
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => window.open("https://petra.app/", "_blank")}
      >
        Install Petra Wallet
      </Button>
    );
  }

  if (isLoading) {
    return (
      <Button variant={variant} disabled className="min-w-[180px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
      </Button>
    );
  }

  if (walletInfo.isConnected) {
    return (
      <Button
        variant={variant}
        className="text-xs"
        onClick={disconnectWallet}
      >
        <Wallet className="mr-1 h-4 w-4" />
        {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={connectWallet}
      className="min-w-[180px]"
    >
      <Wallet className="mr-2 h-4 w-4" /> Connect Petra Wallet
    </Button>
  );
}

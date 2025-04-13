
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, ExternalLink, Download } from "lucide-react";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AptosWalletButtonProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function AptosWalletButton({ variant = "outline" }: AptosWalletButtonProps) {
  const { walletInfo, connectWallet, disconnectWallet, isLoading, isWalletInstalled } = useAptosWallet();
  const [showInstallDialog, setShowInstallDialog] = useState(false);

  if (!isWalletInstalled) {
    return (
      <>
        <Button
          variant="outline"
          className="text-xs flex items-center gap-2"
          onClick={() => setShowInstallDialog(true)}
        >
          <Download className="h-4 w-4" />
          Install Petra Wallet
        </Button>

        <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Install Petra Wallet</DialogTitle>
              <DialogDescription>
                You need to install the Petra Wallet browser extension to use premium features.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">What is Petra Wallet?</h3>
                <p className="text-sm text-muted-foreground">
                  Petra is a browser extension wallet for the Aptos blockchain that allows you to securely store, send, and interact with Aptos assets and applications.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Installation Steps:</h3>
                <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                  <li>Click the "Install Petra Wallet" button below</li>
                  <li>Follow the browser extension installation process</li>
                  <li>Create a new wallet or import an existing one</li>
                  <li>Return to this page and refresh</li>
                </ol>
              </div>
            </div>
            <DialogFooter className="flex sm:justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowInstallDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => window.open("https://petra.app/", "_blank")}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Install Petra Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
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

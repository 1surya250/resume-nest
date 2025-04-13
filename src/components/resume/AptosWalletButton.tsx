
import { useAptosWallet } from "@/hooks/use-aptos-wallet";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, ExternalLink, Download, Crown, Lock, Copy, Check, Info, AlertCircle } from "lucide-react";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAptosBalance } from "@/lib/aptos-client";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type AptosWalletButtonProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function AptosWalletButton({ variant = "outline" }: AptosWalletButtonProps) {
  const { walletInfo, connectWallet, disconnectWallet, isLoading, isWalletInstalled } = useAptosWallet();
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyAddress = () => {
    if (walletInfo.address) {
      navigator.clipboard.writeText(walletInfo.address);
      setCopied(true);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              className="text-xs gap-2"
            >
              <Badge variant="secondary" className="px-1 h-5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-1" />
                {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Wallet Account</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between">
              <span>Balance:</span>
              <span className="font-medium">{formatAptosBalance(walletInfo.balance)} APT</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-green-700 dark:text-green-400">
              <Crown className="h-4 w-4" /> Premium Access Enabled
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setShowCredentialsDialog(true)}
            >
              <Info className="h-4 w-4 mr-2" /> View Wallet Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={disconnectWallet}
              className="text-destructive"
            >
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={showCredentialsDialog} onOpenChange={setShowCredentialsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" /> Aptos Wallet Credentials
              </DialogTitle>
              <DialogDescription>
                Your wallet information and premium access details.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Account Details</TabsTrigger>
                <TabsTrigger value="guide">User Guide</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Wallet Address</h3>
                    <div className="flex">
                      <Input 
                        value={walletInfo.address} 
                        readOnly 
                        className="flex-1 font-mono text-xs"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={handleCopyAddress}
                        className="ml-2"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Wallet Balance</h3>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <span className="text-sm">APT Balance:</span>
                      <span className="font-bold">{formatAptosBalance(walletInfo.balance)} APT</span>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <h3 className="text-sm font-medium">Premium Status</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your wallet is connected and premium features are unlocked. You now have access to all premium resume templates and advanced features.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="guide" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <h3 className="text-sm font-medium">About Your Wallet</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You're connected with Petra Wallet on the Aptos blockchain. Your wallet allows you to access premium features without requiring a subscription.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Available Actions</h3>
                    <ul className="text-xs space-y-2">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Access all premium resume templates</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Save unlimited resume drafts</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Export in multiple formats (PDF, DOCX)</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>Create custom resume sections</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Need Help?</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open("https://petra.app/docs/use", "_blank")}
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Petra Wallet Documentation
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button onClick={() => setShowCredentialsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button
      variant="default"
      onClick={connectWallet}
      className="min-w-[180px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
    >
      <Lock className="mr-2 h-4 w-4" /> Unlock Premium Features
    </Button>
  );
}

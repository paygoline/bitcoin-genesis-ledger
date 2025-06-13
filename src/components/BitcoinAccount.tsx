import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Clock, Copy, User, Wallet, CheckCircle, AlertCircle, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import BitcoinConnectionForm from "./BitcoinConnectionForm";

interface User {
  id: string;
  email: string;
  fullName: string;
  bitcoinAddress: string;
  balance: number;
  isBalanceActive: boolean;
  registrationTime: Date;
}

interface BitcoinAccountProps {
  user: User;
}

const BitcoinAccount = ({ user }: BitcoinAccountProps) => {
  const [showConnectionForm, setShowConnectionForm] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Bitcoin address copied to clipboard",
    });
  };

  const formatBTC = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
    }).format(amount);
  };

  const handleConnectionSubmit = (data: any) => {
    console.log("Connection data submitted:", data);
    toast({
      title: "Connection Successful!",
      description: `Successfully connected wallet for converting ${data.conversionAmount} BTC to USD.`,
    });
    setShowConnectionForm(false);
  };

  if (showConnectionForm) {
    return (
      <div className="space-y-6">
        <BitcoinConnectionForm 
          onSubmit={handleConnectionSubmit}
          onCancel={() => setShowConnectionForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Account Information
            </div>
            <Button
              onClick={() => setShowConnectionForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Convert to USD
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="text-white font-semibold">{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="text-white font-semibold">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-none text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bitcoin className="mr-2 h-6 w-6" />
              Bitcoin Balance
            </div>
            {user.isBalanceActive ? (
              <Badge variant="secondary" className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Clock className="mr-1 h-3 w-3" />
                Pending
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">
            ₿ {formatBTC(user.balance)}
          </div>
          {!user.isBalanceActive && (
            <div className="flex items-center text-orange-100">
              <AlertCircle className="mr-2 h-4 w-4" />
              <span className="text-sm">
                Balance will be credited in 5 minutes after registration
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bitcoin Address Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Wallet className="mr-2 h-5 w-5" />
            Bitcoin Address
          </CardTitle>
          <CardDescription className="text-slate-400">
            Your unique Bitcoin receiving address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between bg-slate-700 p-3 rounded-lg">
            <code className="text-green-400 text-sm font-mono break-all mr-2">
              {user.bitcoinAddress}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(user.bitcoinAddress)}
              className="text-white hover:bg-slate-600"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-sm text-slate-400">Active Accounts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-slate-400">Transactions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {new Date(user.registrationTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-slate-400">Member Since</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BitcoinAccount;

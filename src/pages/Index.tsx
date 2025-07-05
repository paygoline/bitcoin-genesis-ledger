
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Bitcoin, Clock, User, Wallet } from "lucide-react";
import BitcoinAccount from "@/components/BitcoinAccount";
import RegistrationForm from "@/components/RegistrationForm";

interface User {
  id: string;
  email: string;
  fullName: string;
  country: string;
  bitcoinAddress: string;
  balance: number;
  isBalanceActive: boolean;
  registrationTime: Date;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            // Time's up, credit the balance
            setCurrentUser(prevUser => prevUser ? {
              ...prevUser,
              balance: 500,
              isBalanceActive: true
            } : null);
            
            toast({
              title: "Balance Added!",
              description: "500 BTC has been added to your account.",
            });
            
            return null;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleUserRegistration = (userData: Omit<User, 'id' | 'bitcoinAddress' | 'balance' | 'isBalanceActive' | 'registrationTime'>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      bitcoinAddress: `bc1q${Math.random().toString(36).substr(2, 32)}`,
      balance: 0,
      isBalanceActive: false,
      registrationTime: new Date()
    };

    setCurrentUser(newUser);
    setCountdown(120); // 2 minutes in seconds
    
    toast({
      title: "Account Created Successfully!",
      description: "Your Bitcoin account has been created. Balance will be added in 2 minutes.",
    });
  };

  const handleConnectAccount = () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Account Connected!",
        description: "Your Bitcoin account has been successfully connected.",
      });
    }, 2000);
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-white">Bitcoin Genesis Ledger</h1>
            </div>
            <Button 
              onClick={handleConnectAccount}
              disabled={isConnecting}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isConnecting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Account
                </>
              )}
            </Button>
          </div>

          {countdown !== null && countdown > 0 && (
            <Card className="bg-yellow-600 border-yellow-500 text-white mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="h-6 w-6 animate-pulse" />
                  <div className="text-center">
                    <p className="text-lg font-semibold">Balance Credit Countdown</p>
                    <p className="text-2xl font-bold">{formatCountdown(countdown)}</p>
                    <p className="text-sm opacity-90">500 BTC will be credited to your account</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <BitcoinAccount user={currentUser} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Bitcoin className="h-12 w-12 text-orange-500" />
            <h1 className="text-4xl font-bold text-white">Bitcoin Genesis</h1>
          </div>
          <p className="text-slate-400 text-lg">Your gateway to the Bitcoin ecosystem</p>
        </div>
        
        <RegistrationForm onSubmit={handleUserRegistration} />
      </div>
    </div>
  );
};

export default Index;

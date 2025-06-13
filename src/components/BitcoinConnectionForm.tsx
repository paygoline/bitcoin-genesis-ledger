
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Wallet, DollarSign, Shield, ArrowRightLeft } from "lucide-react";

interface BitcoinConnectionData {
  walletAddress: string;
  walletType: string;
  bankAccount: string;
  routingNumber: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  conversionAmount: string;
}

interface BitcoinConnectionFormProps {
  onSubmit: (data: BitcoinConnectionData) => void;
  onCancel: () => void;
}

const BitcoinConnectionForm = ({ onSubmit, onCancel }: BitcoinConnectionFormProps) => {
  const [formData, setFormData] = useState<BitcoinConnectionData>({
    walletAddress: "",
    walletType: "",
    bankAccount: "",
    routingNumber: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    conversionAmount: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.walletAddress || !formData.bankAccount || !formData.fullName || !formData.conversionAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof BitcoinConnectionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="bg-slate-800 border-slate-700 max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center">
          <ArrowRightLeft className="mr-2 h-6 w-6 text-orange-500" />
          Connect Bitcoin Account
        </CardTitle>
        <CardDescription className="text-center text-slate-400">
          Provide your information to convert Bitcoin to USD
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Wallet Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-white">Wallet Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-white">
                Bitcoin Wallet Address *
              </Label>
              <Input
                id="walletAddress"
                type="text"
                placeholder="Enter your Bitcoin wallet address"
                value={formData.walletAddress}
                onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletType" className="text-white">
                Wallet Type
              </Label>
              <Select onValueChange={(value) => handleInputChange("walletType", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware Wallet</SelectItem>
                  <SelectItem value="software">Software Wallet</SelectItem>
                  <SelectItem value="exchange">Exchange Wallet</SelectItem>
                  <SelectItem value="paper">Paper Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversionAmount" className="text-white">
                Amount to Convert (BTC) *
              </Label>
              <Input
                id="conversionAmount"
                type="number"
                step="0.00000001"
                placeholder="0.00000000"
                value={formData.conversionAmount}
                onChange={(e) => handleInputChange("conversionAmount", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Banking Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold text-white">Banking Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankAccount" className="text-white">
                Bank Account Number *
              </Label>
              <Input
                id="bankAccount"
                type="text"
                placeholder="Enter your bank account number"
                value={formData.bankAccount}
                onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingNumber" className="text-white">
                Routing Number *
              </Label>
              <Input
                id="routingNumber"
                type="text"
                placeholder="Enter your bank routing number"
                value={formData.routingNumber}
                onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Verification Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullNameVerify" className="text-white">
                Full Legal Name *
              </Label>
              <Input
                id="fullNameVerify"
                type="text"
                placeholder="Enter your full legal name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Home Address *
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ArrowRightLeft className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Connect & Convert
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BitcoinConnectionForm;

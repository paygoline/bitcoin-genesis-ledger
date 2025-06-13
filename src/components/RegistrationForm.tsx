
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, User, Flag } from "lucide-react";

interface RegistrationFormProps {
  onSubmit: (userData: { email: string; fullName: string; country: string }) => void;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    country: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands",
    "Switzerland", "Austria", "Belgium", "Denmark", "Sweden", "Norway", "Finland", "Australia",
    "New Zealand", "Japan", "South Korea", "Singapore", "Hong Kong", "UAE", "Saudi Arabia",
    "Brazil", "Argentina", "Mexico", "India", "South Africa", "Nigeria", "Kenya", "Egypt"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.fullName || !formData.country) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate registration process
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Create Bitcoin Account
        </CardTitle>
        <CardDescription className="text-center text-slate-400">
          Register to receive your 500 BTC welcome bonus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-white flex items-center">
              <Flag className="mr-2 h-4 w-4" />
              Country
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="text-white hover:bg-slate-600">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white flex items-center">
              <User className="mr-2 h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 font-semibold"
            disabled={isSubmitting || !formData.email || !formData.fullName || !formData.country}
          >
            {isSubmitting ? (
              <>
                <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Bitcoin Account
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;

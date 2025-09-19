import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { Header } from "@/components/Header";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { signup, sendOTP, verifyOTP, isLoading } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  
  // UI state
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      isValid: minLength && hasUpper && hasLower && hasNumber
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Password does not meet requirements");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        // Send OTP for email verification
        const otpResult = await sendOTP(email);
        if (otpResult.success) {
          setOtpSent(true);
          setStep("otp");
        } else {
          setError(otpResult.error || "Failed to send verification code");
        }
      } else {
        setError(result.error || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await verifyOTP(email, otp);
      if (result.success) {
        setLocation("/");
      } else {
        setError(result.error || "Invalid verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await sendOTP(email);
      if (result.success) {
        setOtpSent(true);
        setError("");
      } else {
        setError(result.error || "Failed to resend verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header variant="solid" className="relative bg-white shadow-sm" />
      
      <div className="container mx-auto px-6 pt-32 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">
                {step === "form" ? "Create Account" : "Verify Email"}
              </CardTitle>
              <CardDescription>
                {step === "form" 
                  ? "Join SM Furnishings and discover beautiful furniture"
                  : `Enter the verification code sent to ${email}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "form" ? (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    
                    {password && (
                      <div className="text-xs space-y-1 mt-2">
                        <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-500'}`}>
                          <CheckCircle className={`w-3 h-3 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-300'}`} />
                          At least 8 characters
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.hasUpper ? 'text-green-600' : 'text-red-500'}`}>
                          <CheckCircle className={`w-3 h-3 ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-300'}`} />
                          One uppercase letter
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.hasLower ? 'text-green-600' : 'text-red-500'}`}>
                          <CheckCircle className={`w-3 h-3 ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-300'}`} />
                          One lowercase letter
                        </div>
                        <div className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
                          <CheckCircle className={`w-3 h-3 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-300'}`} />
                          One number
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-terracotta hover:bg-terracotta-dark text-white font-medium"
                    disabled={isSubmitting || !passwordValidation.isValid || password !== confirmPassword}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {otpSent && (
                    <Alert>
                      <AlertDescription>
                        Verification code sent to your email. Please check your inbox.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      disabled={isSubmitting}
                      className="h-12 text-center text-lg tracking-wider"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-terracotta hover:bg-terracotta-dark text-white font-medium"
                    disabled={isSubmitting || otp.length !== 6}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleResendOtp}
                      disabled={isSubmitting}
                      className="text-terracotta hover:text-terracotta-dark"
                    >
                      Resend verification code
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-terracotta hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
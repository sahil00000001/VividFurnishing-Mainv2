import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, Mail, Calendar, Shield, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { Header } from "@/components/Header";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout, sendOTP, verifyOTP, isAuthenticated } = useAuth();
  const [otp, setOtp] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    setLocation("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await sendOTP(user.email);
      if (result.success) {
        setShowOtpVerification(true);
        setSuccess("Verification code sent to your email");
      } else {
        setError(result.error || "Failed to send verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await verifyOTP(user.email, otp);
      if (result.success) {
        setSuccess("Email verified successfully!");
        setShowOtpVerification(false);
        setOtp("");
      } else {
        setError(result.error || "Invalid verification code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header variant="solid" className="relative bg-white shadow-sm" />
      
      <div className="container mx-auto px-6 pt-32 pb-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-serif">{user.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Account Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-muted-foreground">Email Verification</Label>
                  {user.emailVerified ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Verified
                    </Badge>
                  )}
                </div>

                {!user.emailVerified && (
                  <Button
                    onClick={handleSendOtp}
                    disabled={isSubmitting}
                    size="sm"
                    className="bg-terracotta hover:bg-terracotta-dark"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Verify Email"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* OTP Verification */}
          {showOtpVerification && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>
                  Enter the verification code sent to {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
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

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-terracotta hover:bg-terracotta-dark"
                      disabled={isSubmitting || otp.length !== 6}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOtpVerification(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Alerts */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          {/* Account Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/shop">
                  <Button variant="outline" className="w-full h-12">
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full h-12"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
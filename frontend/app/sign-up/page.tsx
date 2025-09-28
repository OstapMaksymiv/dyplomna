"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import "./signupPage.css";
import Image from "next/image";
import { Caveat, Shadows_Into_Light } from "next/font/google";
import { authApi } from "@/api/api";
const caveat = Caveat({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const ShadowIntoLight = Shadows_Into_Light({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await authApi.register(email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-[600px] relative flex items-center justify-between p-4 rounded-4xl">
      <h4
        className={`${caveat.className} text-9xl  text_change  font-bold flex-1 text-center`}
      >
        Trust
      </h4>
      <Card className="w-full max-w-md shadow-xl login border-2 border-solid border-black flex-1">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-6xl font-bold ">Sign up</h1>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              Account created successfully!
            </p>
          )}
          <Button onClick={handleSignUp} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </CardContent>
      </Card>
      <h4
        className={`text_change  text-9xl flex-1 text-center  font-bold tracking-tighter `}
      >
        process
      </h4>
    </div>
  );
}

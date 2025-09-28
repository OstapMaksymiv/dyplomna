"use client";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import "./loginPage.css";
import { Caveat, Shadows_Into_Light } from "next/font/google";
import { authApi } from "@/api/api";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
const caveat = Caveat({
  subsets: ["latin"],
});

export default function SigninPage() {
  const { updateUser } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setError("");
    setSuccess(false);
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      updateUser(res);
      setSuccess(true);

      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-[600px] relative flex items-center justify-center p-4 rounded-4xl">
      <h4
        className={`${caveat.className} text-9xl  text_change flex-1 font-bold text-center`}
      >
        Trust
      </h4>
      <Card className="w-full max-w-md shadow-xl login border-2 border-solid border-black flex-1">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-center text-6xl font-bold ">Sign in</h1>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </CardContent>
      </Card>
      <h4
        className={`text_change  text-9xl flex-1 text-center font-bold tracking-tighter`}
      >
        process
      </h4>
    </div>
  );
}

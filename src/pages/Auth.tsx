import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        navigate("/");
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error);
      } else {
        setSuccess("Registration successful! Please check your email to verify your account.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[400px] mx-auto mt-20 p-8 bg-yoza-navbar/30 rounded-2xl border border-yoza-navbar backdrop-blur-sm shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground border-b-2 border-accent pb-3">
          {isLogin ? "Login" : "Register"}
        </h1>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary bg-card text-foreground"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-border rounded-xl text-sm outline-none focus:border-primary bg-card text-foreground"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-base cursor-pointer border-none transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
            className="text-primary font-semibold bg-transparent border-none cursor-pointer underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

import { useState } from "react";
import {
  AlertCircle,
  Award,
  BookOpen,
  Building2,
  CheckCircle,
  ChevronLeft,
  Eye,
  EyeOff,
  Hash,
  Lock,
  Mail,
  TrendingUp,
} from "lucide-react";
import logo from "../../assets/logo.png";
import gateImage from "../../assets/1620px-University_of_Ibadan_gate_Ibadan4.webp";
import { MOCK_USER } from "../../data/mockData";

export default function LoginPage({ onLogin }) {
  const [matric, setMatric] = useState("190404001");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (matric && password) {
        onLogin(MOCK_USER);
        return;
      }

      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }, 1200);
  };

  const handleResetPassword = () => {
    if (!resetEmail.trim()) return;

    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setResetSent(true);
    }, 1200);
  };

  return (
    <div className="login-shell min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div 
        className="hidden flex-1 flex-col justify-between overflow-hidden p-12 lg:flex lg:relative"
        style={{
          backgroundImage: `url('${gateImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-transparent" />
        <div className="login-shell__orb absolute inset-0 opacity-10" />

        <div className="relative z-10">
          <div className="mb-16 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-xl">
              <img src={logo} alt="UI Student Portal" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "Sora" }}>UI Student Portal</p>
              <p className="text-sm text-indigo-300">Student Academic Hub</p>
            </div>
          </div>

          <h2 className="mb-4 text-4xl font-bold leading-tight text-white" style={{ fontFamily: "Sora" }}>
            Your Academic Life,
            <br />
            <span className="text-indigo-400">Centralized.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-indigo-200">
            Manage courses, hostel applications, assignments, CGPA tracking and more — all in one place.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: "Course Registration", desc: "Add/Drop courses" },
            { icon: Building2, label: "Hostel Booking", desc: "Digital QR clearance" },
            { icon: TrendingUp, label: "CGPA Tracker", desc: "7.0 scale calculator" },
            { icon: Award, label: "Scholarship Portal", desc: "MTN, NLNG, Shell" },
          ].map(({ icon, label, desc }) => {
            const FeatureIcon = icon;

            return (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <FeatureIcon className="mb-2 h-5 w-5 text-indigo-400" />
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-indigo-300">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-[420px] lg:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
              <img src={logo} alt="UI Student Portal" className="h-full w-full object-cover" />
            </div>
            <p className="text-base font-bold text-white" style={{ fontFamily: "Sora" }}>UI Student Portal</p>
          </div>

          {forgotMode ? (
            <>
              <button
                onClick={() => {
                  setForgotMode(false);
                  setResetSent(false);
                  setResetEmail("");
                }}
                className="mb-6 flex items-center gap-1 text-xs text-indigo-400 transition-colors hover:text-indigo-300"
              >
                <ChevronLeft className="h-3 w-3" />
                Back to Sign In
              </button>

              <h3 className="mb-1 text-2xl font-bold text-white" style={{ fontFamily: "Sora" }}>Forgot Password?</h3>
              <p className="mb-8 text-sm text-indigo-300">Enter your email and we&apos;ll send you a reset link.</p>

              {resetSent ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-green-400/30 bg-green-500/20 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <p className="font-semibold text-green-300">Reset link sent!</p>
                    </div>
                    <p className="text-xs leading-relaxed text-green-300">
                      Check your registered email address for a password reset link. It may take a few minutes to arrive.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setForgotMode(false);
                      setResetSent(false);
                      setResetEmail("");
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-indigo-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                      <input
                        value={resetEmail}
                        onChange={(event) => setResetEmail(event.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-10 text-sm text-white placeholder-indigo-400 transition-all focus:border-indigo-400 focus:bg-white/15 focus:outline-none"
                        placeholder="e.g. username@ui.edu.ng"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading || !resetEmail.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60"
                  >
                    {resetLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="mb-1 text-2xl font-bold text-white" style={{ fontFamily: "Sora" }}>Welcome</h3>
              <p className="mb-8 text-sm text-indigo-300">Sign in with your Matric Number</p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-indigo-300">MATRIC NUMBER</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                    <input
                      value={matric}
                      onChange={(event) => setMatric(event.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-10 text-sm text-white placeholder-indigo-400 transition-all focus:border-indigo-400 focus:bg-white/15 focus:outline-none"
                      placeholder="e.g. 190404001"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-medium text-indigo-300">PASSWORD</label>
                    <button onClick={() => setForgotMode(true)} className="text-xs text-indigo-400 transition-colors hover:text-indigo-300">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-10 pr-10 text-sm text-white placeholder-indigo-400 transition-all focus:border-indigo-400 focus:outline-none"
                      placeholder="••••••••"
                    />
                    <button onClick={() => setShowPass((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/20 p-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In to Portal"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
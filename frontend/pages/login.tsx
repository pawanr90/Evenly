import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import { auth } from '../lib/api';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      const response = await auth.login(email, password);
      console.log('Login response:', response);
      
      if (response.access_token) {
        dispatch(setCredentials({ user: response.user, token: response.access_token }));
        router.push('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        {/* Left: Auth card */}
        <div className="flex w-full items-center justify-center px-6 py-12 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3">
              <img src="/evenly-logo.svg" alt="Evenly" className="h-10 w-10" />
              <span className="text-2xl font-semibold text-white">Evenly</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-400">Sign in to split expenses, settle up, and keep it fair.</p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 outline-none ring-1 ring-transparent transition focus:border-indigo-500 focus:ring-indigo-500/30"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-gray-300">
                      Password
                    </label>
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 outline-none ring-1 ring-transparent transition focus:border-indigo-500 focus:ring-indigo-500/30"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-800 bg-red-900/40 px-4 py-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="/register" className="text-indigo-400 hover:text-indigo-300">
                  Create one
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Marketing/info panel */}
        <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 lg:flex">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,.6) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.4) 0, transparent 35%), radial-gradient(circle at 10% 80%, rgba(255,255,255,.35) 0, transparent 40%)'}} />
          <div className="relative z-10 mx-auto max-w-lg px-8 py-16 text-white">
            <div className="mb-8 flex items-center gap-3">
              <img src="/evenly-logo.svg" alt="Evenly" className="h-8 w-8" />
              <span className="text-xl font-semibold">Evenly</span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight">Split expenses the modern way</h2>
            <p className="mt-3 text-white/90">
              Track shared costs, settle up instantly, and keep every group in balance.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-white/90" />
                Real-time balances across groups
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-white/90" />
                Smart settlement suggestions
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-white/90" />
                Works great on mobile and desktop
              </li>
            </ul>

            <div className="mt-10 rounded-xl bg-white/10 p-4 text-sm backdrop-blur">
              <p>
                “Evenly makes trips with friends so much easier. No more spreadsheets.”
              </p>
              <p className="mt-2 text-white/80">— A happy traveler</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
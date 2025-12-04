import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, LogIn, AlertTriangle } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 pattern-bg">
      <style>{`.pattern-bg { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 16px 16px; }`}</style>
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl border border-slate-200 p-8 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 ring-4 ring-white">
          <GraduationCap className="text-green-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Espace Administration</h1>
        <p className="text-slate-500 mb-8">Connectez-vous pour accéder au tableau de bord.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 text-left text-sm flex items-center gap-2 rounded-md">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (aercd-badmin@gmail.com)"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe (aercd-b2025)"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                </>
            ) : (
                <><LogIn size={18} /> Se Connecter</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
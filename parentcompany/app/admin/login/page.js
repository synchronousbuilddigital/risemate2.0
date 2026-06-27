"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.success) {
                router.push('/admin');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection failed. Please check your network.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#000c24] text-white min-h-screen flex items-center justify-center relative overflow-hidden grain selection:bg-[#C9A84C] selection:text-dark">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#002366]/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md p-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#001233]/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#002366] via-[#C9A84C] to-[#002366]" />

                    <div className="text-center mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#C9A84C] block mb-3">Institutional Console</span>
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Sovereign <span className="text-[#C9A84C] italic">Portal.</span></h1>
                        <p className="text-xs text-white/40">Secure administrator database access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter admin username"
                                className="w-full bg-[#000c24]/50 border border-white/10 focus:border-[#C9A84C]/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter account password"
                                className="w-full bg-[#000c24]/50 border border-white/10 focus:border-[#C9A84C]/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A84C] hover:bg-[#b0913b] text-dark font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#C9A84C]/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="animate-pulse">Authorizing...</span>
                            ) : (
                                <>
                                    <span>Authenticate Connection</span>
                                    <span className="material-symbols-outlined text-sm font-bold">login</span>
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                <div className="text-center mt-8">
                    <a href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-[#C9A84C] transition-colors">
                        <span className="material-symbols-outlined text-xs">arrow_back</span>
                        Return to Public Terminal
                    </a>
                </div>
            </div>
        </div>
    );
}

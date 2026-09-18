import React, { useState } from 'react';
import { KeyRound, LogIn, X } from 'lucide-react';
import { AppLanguage } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  currentLanguage: AppLanguage;
  onClose: () => void;
  onSubmit: (username: string, password: string) => Promise<void>;
  isLocal?: boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  currentLanguage,
  onClose,
  onSubmit,
  isLocal = false,
}) => {
  const isVi = currentLanguage === 'VI';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await onSubmit(username.trim(), password);
      setUsername('');
      setPassword('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : (isVi ? 'Đăng nhập thất bại.' : 'Sign in failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
      <div className="relative w-full max-w-md rounded-3xl border border-[#3b3b3b] bg-[#181818] p-7 shadow-2xl sm:p-9">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#888] hover:bg-[#282828] hover:text-white" aria-label={isVi ? 'Đóng' : 'Close'}>
          <X className="h-5 w-5" />
        </button>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4a4a4a] bg-[#222] text-[#aeb8c2]">
          <KeyRound className="h-5 w-5" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#aeb8c2]">B+ON ADMIN</p>
        <h2 id="admin-login-title" className="mt-3 text-3xl font-light font-philosopher uppercase text-white">
          {isVi ? 'Đăng nhập' : 'Sign in'}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#999]">
          {isLocal ? (isVi ? 'Đăng nhập bằng tài khoản admin riêng để mở Edit Mode trên bản local.' : 'Sign in with the separate admin account to open Edit Mode on localhost.') : (isVi ? 'Dùng tài khoản riêng để mở Edit Mode. Không dùng mật khẩu ChatGPT.' : 'Use the separate admin account to open Edit Mode. This is not your ChatGPT password.')}
        </p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-[#a5a5a5]">{isVi ? 'Tài khoản' : 'Username'}</span>
            <input autoFocus required value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#101010] px-4 py-3.5 text-base text-white outline-none focus:border-[#aeb8c2]" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.16em] text-[#a5a5a5]">{isVi ? 'Mật khẩu' : 'Password'}</span>
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#101010] px-4 py-3.5 text-base text-white outline-none focus:border-[#aeb8c2]" />
          </label>
          {error && <p className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-200">{error}</p>}
          <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#aeb8c2] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#141414] transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60">
            <LogIn className="h-4 w-4" />
            <span>{submitting ? (isVi ? 'Đang kiểm tra...' : 'Checking...') : (isVi ? 'Đăng nhập admin' : 'Sign in as admin')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

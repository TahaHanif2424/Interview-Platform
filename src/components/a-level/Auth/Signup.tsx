import { useState } from 'react';
import { useSignupForm } from './useAuth';

interface SignupProps {
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useSignupForm();

  return (
    <>
      <h1 className="text-2xl font-bold text-text mb-5 tracking-tight">
        Create Account
      </h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-secondary ml-1">
            Name
          </label>
          <div className="relative flex items-center">
            <svg
              className="absolute left-3 w-4 h-4 text-text-light pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full py-2 pl-9 pr-3 text-sm border border-border rounded-lg outline-none transition-all duration-200 bg-white text-text placeholder:text-text-light focus:border-accent focus:shadow-[0_0_0_2px_rgba(16,185,129,0.1)]"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <span className="text-xs text-red-500 ml-1">
              {formik.errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-secondary ml-1">
            Email
          </label>
          <div className="relative flex items-center">
            <svg
              className="absolute left-3 w-4 h-4 text-text-light pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full py-2 pl-9 pr-3 text-sm border border-border rounded-lg outline-none transition-all duration-200 bg-white text-text placeholder:text-text-light focus:border-accent focus:shadow-[0_0_0_2px_rgba(16,185,129,0.1)]"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500 ml-1">
              {formik.errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-secondary ml-1">
            Password
          </label>
          <div className="relative flex items-center">
            <svg
              className="absolute left-3 w-4 h-4 text-text-light pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full py-2 pl-9 pr-10 text-sm border border-border rounded-lg outline-none transition-all duration-200 bg-white text-text placeholder:text-text-light focus:border-accent focus:shadow-[0_0_0_2px_rgba(16,185,129,0.1)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 bg-transparent border-none cursor-pointer p-0.5 flex items-center justify-center"
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-text-light"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-text-light"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500 ml-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Account Type Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-secondary ml-1">
            Sign up as
          </label>
          <div className="flex gap-3">
            <label
              className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                formik.values.type === 'USER'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <input
                type="radio"
                name="type"
                value="USER"
                checked={formik.values.type === 'USER'}
                onChange={formik.handleChange}
                className="accent-accent"
              />
              <div>
                <span className="text-sm font-medium text-text">User</span>
                <p className="text-xs text-text-light">
                  Find jobs & interviews
                </p>
              </div>
            </label>
            <label
              className={`flex-1 flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                formik.values.type === 'COMPANY'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <input
                type="radio"
                name="type"
                value="COMPANY"
                checked={formik.values.type === 'COMPANY'}
                onChange={formik.handleChange}
                className="accent-accent"
              />
              <div>
                <span className="text-sm font-medium text-text">Company</span>
                <p className="text-xs text-text-light">Hire candidates</p>
              </div>
            </label>
          </div>
          {formik.values.type === 'COMPANY' && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md ml-1">
              Company accounts require purchasing a subscription to access
              hiring services.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-2 text-sm font-semibold text-white bg-accent border-none rounded-lg cursor-pointer transition-all duration-200 mt-1 hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <span className="flex-1 h-px bg-border"></span>
          <span className="text-xs text-text-light font-medium">or</span>
          <span className="flex-1 h-px bg-border"></span>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-3">
          {/* Google */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="#10B981"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#374151"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#374151"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#1F2933"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" fill="#374151" />
              <path
                fill="#F9FAFB"
                d="M15.5 8.5h-2c-.5 0-1 .5-1 1v2h3l-.5 3h-2.5v6h-3v-6H7v-3h2.5v-2.5c0-2 1.5-3.5 3.5-3.5h2.5v3z"
              />
            </svg>
          </button>

          {/* Apple */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="#10B981"
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              />
            </svg>
          </button>
        </div>

        {/* Toggle to Login */}
        <p className="text-center text-xs text-text-muted mt-1">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="bg-transparent border-none text-accent font-semibold cursor-pointer text-xs underline"
          >
            Login
          </button>
        </p>
      </form>
    </>
  );
};

export default Signup;

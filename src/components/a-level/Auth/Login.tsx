import React, { useState } from 'react';
import {
  Button,
  Input,
  EmailIcon,
  LockIcon,
  PasswordToggle,
  GoogleIcon,
  FacebookIcon,
  AppleIcon,
} from '../../c-level';
import { useLoginForm } from './useAuth';
import { useAuthStore } from '../../../store/authStore';

interface LoginProps {
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const authdata=useAuthStore();
  const formik = useLoginForm();

  return (
    <>
      <h1 className="text-2xl font-bold text-text mb-5 tracking-tight">
        Welcome Back!!
      </h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3.5">
        {/* Email Field */}
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="email@gmail.com"
          value={authdata.user?.email || formik.values.email}
          onChange={formik.handleChange}
          leftIcon={<EmailIcon />}
        />

        {/* Password Field */}
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          leftIcon={<LockIcon />}
          rightElement={
            <PasswordToggle
              showPassword={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          }
        />

        {/* Forgot Password */}
        <div className="text-right -mt-1">
          <a
            href="#"
            className="text-xs text-secondary font-medium no-underline hover:text-accent"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth className="mt-1">
          Login
        </Button>

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
            className="w-10 h-10 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <GoogleIcon className="w-7 h-7" />
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <FacebookIcon className="w-7 h-7" />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <AppleIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Toggle to Signup */}
        <p className="text-center text-xs text-text-muted mt-1">
          Don't have an account?{' '}
          <Button type="button" variant="link" onClick={onSwitchToSignup}>
            Sign up
          </Button>
        </p>
      </form>
    </>
  );
};

export default Login;

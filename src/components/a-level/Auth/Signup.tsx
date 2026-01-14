import { useState } from 'react';
import { useSignupForm } from './useAuth';
import {
  Button,
  Input,
  UserIcon,
  EmailIcon,
  LockIcon,
  PasswordToggle,
  GoogleIcon,
  FacebookIcon,
  AppleIcon,
} from '../../c-level';

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
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          leftIcon={<UserIcon />}
          error={formik.touched.name ? formik.errors.name : undefined}
        />

        {/* Email Field */}
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="email@gmail.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          leftIcon={<EmailIcon />}
          error={formik.touched.email ? formik.errors.email : undefined}
        />

        {/* Password Field */}
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          leftIcon={<LockIcon />}
          rightElement={
            <PasswordToggle
              showPassword={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          }
          error={formik.touched.password ? formik.errors.password : undefined}
        />

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
        <Button
          type="submit"
          fullWidth
          disabled={formik.isSubmitting}
          className="mt-1"
        >
          {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
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
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <GoogleIcon />
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <FacebookIcon />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-200 p-0 hover:scale-110"
          >
            <AppleIcon />
          </button>
        </div>

        {/* Toggle to Login */}
        <p className="text-center text-xs text-text-muted mt-1">
          Already have an account?{' '}
          <Button type="button" variant="link" onClick={onSwitchToLogin}>
            Login
          </Button>
        </p>
      </form>
    </>
  );
};

export default Signup;

import React, { useState } from 'react';
import Login from '../components/a-level/Auth/Login';
import Signup from '../components/a-level/Auth/Signup';

interface AuthPageProps {
  characterSrc?: string;
}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-['Segoe_UI','Helvetica_Neue',Arial,sans-serif]">
      {/* Left Side - Form Section */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 bg-[#F9FAFB]">
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          {isLogin ? (
            <Login onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <Signup onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      {/* Right Side - Image Section (Desktop Only) */}
      <div
        className="hidden lg:block lg:w-1/2 xl:w-[55%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/auth-image.png')" }}
      />
    </div>
  );
};

export default AuthPage;

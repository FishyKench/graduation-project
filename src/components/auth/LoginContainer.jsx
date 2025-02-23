import React from "react";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const LoginContainer = ({
  onLogin = () => console.log("Login attempted"),
  onGoogleLogin = () => console.log("Google login clicked"),
  onAppleLogin = () => console.log("Apple login clicked"),
}) => {
  return (
    <div className="w-full max-w-[480px] min-h-[600px] mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-6">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-gray-500 mt-2">
          Please enter your details to sign in
        </p>
      </div>

      <LoginForm onSubmit={onLogin} />

      <div className="text-center text-sm text-gray-500">
        <span>Don't have an account? </span>
        <a
          href="/register"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginContainer;

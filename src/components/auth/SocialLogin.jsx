import React from "react";
import { Button } from "../ui/button";
import { Apple, Chrome } from "lucide-react";

const SocialLogin = ({
  onGoogleLogin = () => console.log("Google login clicked"),
  onAppleLogin = () => console.log("Apple login clicked"),
}) => {
  return (
    <div className="w-full max-w-[400px] p-6 space-y-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-500">or continue with</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onGoogleLogin}
        >
          <Chrome className="h-5 w-5" />
          <span>Google</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={onAppleLogin}
        >
          <Apple className="h-5 w-5" />
          <span>Apple</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;

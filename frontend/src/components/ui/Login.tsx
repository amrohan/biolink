import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = ({ name }: { name: string }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white flex justify-center items-center rounded-xl text-sm sm:text-lg font-semibold shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 active:scale-95"
        type="primary"
        size="large"
        onClick={() => loginWithRedirect()}
      >
        {name}
      </Button>
    </>
  );
};

export default LoginButton;

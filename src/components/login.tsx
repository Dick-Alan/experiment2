import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const LogInPage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#043d0c] to-[#15162c]">
      <div className="border border-lime-400 bg-black p-1 text-lime-400">
        Welcome to the application. You must be logged in to use the
        application.
      </div>
      <button
        className="border border-lime-400 bg-black p-1 text-lime-400"
        onClick={() => void signIn()}
      >
        Log In
      </button>
    </div>
  );
};

export default LogInPage;

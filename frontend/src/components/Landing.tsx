import LoginButton from "./ui/Login";
import { BackgroundLines } from "./ui/BackgroundLines";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Landing() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect to admin page if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        LinkSnap
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center mb-8">
        One link for all your best content. Share, track, and grow—effortlessly.
      </p>
      <div className="z-10 flex flex-col sm:flex-row justify-center items-center w-full gap-2 sm:gap-4">
        {/* Input Field */}
        {/* <input */}
        {/*   type="text" */}
        {/*   className="bg-slate-200 min-w-[200px] sm:min-w-[300px] z-10 py-3.5 rounded-lg px-4 placeholder:text-neutral-400 placeholder:opacity-80 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-60 dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-teal-400 dark:focus:ring-opacity-60 transition-all duration-300 ease-in-out focus:shadow-xl border border-transparent focus:border-teal-400" */}
        {/*   placeholder="linksnap.dev/yourname" */}
        {/* /> */}
        <LoginButton name="Claim your link" />
      </div>
    </BackgroundLines>
  );
}

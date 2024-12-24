import { BackgroundLines } from "./ui/BackgroundLines";

export default function Landing() {
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
        <input
          type="text"
          className="bg-neutral-800 min-w-[200px] sm:min-w-[300px] z-10 py-3.5 rounded-lg px-4 placeholder:text-neutral-400 placeholder:opacity-80 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-60 dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-white dark:focus:ring-teal-400 dark:focus:ring-opacity-60 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl focus:shadow-xl border border-transparent focus:border-teal-400"
          placeholder="linksnap.dev/yourname"
        />

        {/* Button */}
        <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white flex justify-center items-center gap-2 py-2 px-4 sm:py-3 sm:px-6 rounded-xl text-sm sm:text-lg font-semibold shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 active:scale-95">
          Claim your link
        </button>
      </div>
    </BackgroundLines>
  );
}

import React, { useState } from "react";
import ReactLottie from "lottie-react";
import lottieLoading from "./lottieLoading.json";

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  isLoading: string;
  setLoading: (value: string) => void;
};

export const LoadingContext = React.createContext<ContextProps>({
  isLoading: "",
  setLoading: () => {},
});

const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState("");

  const setLoading = (value: string) => {
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <div className="fixed w-full h-full left-0 top-0 z-50 bg-green-200 dark:bg-neutral-950">
          <div className="w-[200px] mx-auto mt-[50vh] translate-y-[-50%]">
            <ReactLottie
              animationData={lottieLoading}
              loop={true}
              className="w-full"
            />
            <div className="text-green-400 text-center">{isLoading}</div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

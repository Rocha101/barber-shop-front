import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingContextProps {
  isLoadingVisible: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  const showLoading = () => setIsLoadingVisible(true);

  const hideLoading = () => setIsLoadingVisible(false);

  const loadingContextValue: LoadingContextProps = useMemo(
    () => ({
      isLoadingVisible,
      showLoading,
      hideLoading,
    }),
    [isLoadingVisible]
  );

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {children}
      {isLoadingVisible && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-background backdrop-blur-md">
          <AiOutlineLoading3Quarters className="h-20 w-20 animate-spin text-primary" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

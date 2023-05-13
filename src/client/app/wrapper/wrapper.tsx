import { createContext, useContext, useState } from "react";

import { UseCases, ViewModels } from "./type";

type WrapperContextType = {
  pushView: <T extends keyof ViewModels>({
    useCase,
    data,
  }: {
    useCase: T;
    data: ViewModels[T];
  }) => void;
  view: { useCase: UseCases; data: any };
};

const WrapperContext = createContext<WrapperContextType>({
  pushView: () => {},
  view: { useCase: UseCases.None, data: null },
});

function WrapperContextProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<{ useCase: UseCases; data: any }>({
    useCase: UseCases.None,
    data: null,
  });

  function pushView<T extends keyof ViewModels>({
    useCase,
    data,
  }: {
    useCase: T;
    data: ViewModels[T];
  }) {
    setView({ useCase, data });
  }

  const contextValue: WrapperContextType = {
    pushView,
    view,
  };

  return (
    <WrapperContext.Provider value={contextValue}>
      {children}
    </WrapperContext.Provider>
  );
}

function useWrapperContext() {
  const context = useContext(WrapperContext);

  if (!context) {
    throw new Error(
      "useWrapperContext must be used within a WrapperContextProvider"
    );
  }

  return context;
}

export { WrapperContextProvider, useWrapperContext };

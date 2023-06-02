import { createContext, useContext, useState } from "react";
import { Identifiable, User } from "@todo-list/dto";

type UserContextType = {
  account?: Identifiable<User>;
  setAccount(account: Identifiable<User>): void;
};

const UserContext = createContext<UserContextType>({
  setAccount: () => {},
  account: undefined,
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Identifiable<User> | undefined>(
    undefined
  );

  function pushView(account: Identifiable<User>) {
    setAccount(account);
  }

  const contextValue: UserContextType = {
    setAccount: pushView,
    account,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserContext must be used within a WrapperContextProvider"
    );
  }

  return context;
}

export { UserContextProvider, useUserContext };

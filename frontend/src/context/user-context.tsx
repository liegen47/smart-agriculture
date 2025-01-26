"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  subscriptionPlanId: string | null;
  subscriptionStatus:
    | "active"
    | "inactive"
    | "past_due"
    | "canceled"
    | "trialing"
    | null;
} | null;

type UserContextType = {
  user: User;
  isLoading: boolean;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userFromSession = sessionStorage.getItem("user");
    if (userFromSession) {
      setUser(JSON.parse(userFromSession));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
} | null;

type AdminContextType = {
  admin: admin;
  isLoading: boolean;
  setAdmin: (admin: admin) => void;
};

const AdminContext = createContext<AdminContextType>({
  admin: null,
  isLoading: true,
  setAdmin: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminFromSession = sessionStorage.getItem("adminUser");
    if (adminFromSession) {
      setAdmin(JSON.parse(adminFromSession));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (admin) {
      sessionStorage.setItem("adminUser", JSON.stringify(admin));
    } else {
      sessionStorage.removeItem("adminUser");
    }
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, isLoading, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

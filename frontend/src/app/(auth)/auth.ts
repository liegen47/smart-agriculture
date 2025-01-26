'use server'
import { cookies } from "next/headers"; 

export const Logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export const LogoutAdmin = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("adminToken");
};
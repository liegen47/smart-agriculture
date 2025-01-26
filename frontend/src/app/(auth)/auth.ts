'use server'
import { cookies } from "next/headers"; 

export const Logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
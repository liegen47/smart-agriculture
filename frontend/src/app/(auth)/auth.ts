'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; 

export const Logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  cookieStore.delete("token");

  redirect("/login");
};
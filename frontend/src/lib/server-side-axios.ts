'use server';
import axios from "axios";
import { cookies } from "next/headers";

export async function getDataById<T>(endpoint: string, id: string): Promise<T | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`, {
        headers: {
          Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.data) {
        return null;
      }
  
      return response.data as T;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return null;
    }
  }
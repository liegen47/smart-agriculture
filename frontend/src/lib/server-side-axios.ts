'use server';
import axios from "axios";
import { cookies } from "next/headers";

export async function getDataById<T, D = Record<string, unknown>>(
  endpoint: string, 
  id: string, 
  method: 'GET' | 'POST' = 'GET', 
  data?: D
): Promise<T | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    try {
      const config = {
        headers: {
          Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      if (method === 'POST') {
        response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`, data, config);
      } else {
        response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}/${id}`, config);
      }
  
      if (!response.data) {
        return null;
      }
  
      return response.data as T;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return null;
    }
  }
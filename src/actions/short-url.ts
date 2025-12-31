"use server";

import { axiosInstance } from "@/lib/helper/request";
import { ShortUrlSchema } from "@/lib/helper/validation";

export const handleShortUrl = async (urlForm: ShortUrlSchema) => {
  try {
    const { data } = await axiosInstance.post("api/v1/short-urls", urlForm);

    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const handleGetShortUrl = async (short_url: string) => {
  try {
    const { data } = await axiosInstance.get("api/v1/short-urls/" + short_url);

    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

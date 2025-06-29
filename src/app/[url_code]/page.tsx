import { handleGetShortUrl } from "@/actions/short-url";
import { axiosInstance } from "@/lib/request";
import { redirect } from "next/navigation";

export default async function GetUrlPage({
  params,
}: {
  params: Promise<{ url_code: string }>;
}) {
  const { url_code } = await params;
  console.log("🚀 ~ url_code:", url_code);

  if (url_code) {
    const { data } = await handleGetShortUrl(url_code);
    return redirect(data.original_url);
  }

  return <h1>Fetching...</h1>;
}

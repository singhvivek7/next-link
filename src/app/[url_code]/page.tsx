import { handleGetShortUrl } from "@/actions/short-url";
import { generateRedirectLink } from "@/lib/helper/short-url";
import { redirect, RedirectType } from "next/navigation";

export default async function GetUrlPage({
  params,
}: {
  params: Promise<{ url_code: string }>;
}) {
  const { url_code } = await params;
  let redirectLink = "/";

  if (url_code) {
    try {
      const { data } = await handleGetShortUrl(url_code);
      redirectLink = generateRedirectLink(data.original_url);
    } catch (err: any) {
      console.log("Error fetching short url", err);
    }
  }

  return redirect(redirectLink, RedirectType.replace);
}

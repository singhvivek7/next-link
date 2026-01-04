import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { handleGetShortUrl } from "@/actions/short-url";
import { trackLinkView } from "@/lib/analytics/service";
import { generateRedirectLink } from "@/lib/helper/short-url";

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

      const headersList = await headers();
      const ip = headersList.get("x-forwarded-for") || "unknown";
      const userAgent = headersList.get("user-agent") || "unknown";
      const referer = headersList.get("referer") || "unknown";

      trackLinkView({
        shortUrl: url_code,
        originalUrl: data.original_url,
        ip,
        userAgent,
        referer,
        timestamp: new Date(),
      });

    } catch (err: any) {
      console.log("Error fetching short url", err);
    }
  }

  return redirect(redirectLink, RedirectType.replace);
}

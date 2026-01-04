import { MetadataRoute } from 'next'

import { env } from '@/config/env';
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL || siteConfig.url

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dash/', '/links/', '/analytics/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}   

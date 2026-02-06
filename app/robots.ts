import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/auth/', '/profile/', '/dashboard/'],
        },
        sitemap: 'https://campwork.vercel.app/sitemap.xml',
    };
}

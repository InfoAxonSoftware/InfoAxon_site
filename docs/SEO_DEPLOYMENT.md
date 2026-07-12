# InfoAxon SEO deployment
Set `VITE_SITE_URL` to the single preferred HTTPS origin before building. Set `VITE_GOOGLE_SITE_VERIFICATION` only to the real token issued by Google Search Console.

`npm run build` generates robots and sitemap files from enabled database records, builds Vite, and creates route-specific HTML for landing pages, solutions, projects and products. Rebuild after publishing or removing public records.

## Nginx
```nginx
server {
 listen 443 ssl http2;
 server_name infoaxon.lk;
 root /var/www/infoaxon/dist;
 location /assets/ { try_files $uri =404; expires 1y; add_header Cache-Control "public, immutable"; }
 location /images/ { try_files $uri =404; expires 30d; }
 location /uploads/ { proxy_pass http://127.0.0.1:5000; expires 30d; }
 location /api/ { proxy_pass http://127.0.0.1:5000; }
 location / { try_files $uri $uri/ /index.html; }
}
```
Asset locations return real 404 responses; only application routes use the SPA fallback.

## Search Console
1. Verify the preferred domain using the real DNS or environment token.
2. Submit `/sitemap.xml`.
3. Inspect the homepage and main landing URLs.
4. Request indexing after production is accessible.
5. Monitor indexing, HTTPS and Core Web Vitals.

No search position is guaranteed. Keep real company name, phone, address and email consistent with the Google Business Profile.

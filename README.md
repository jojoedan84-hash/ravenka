# Ravenka V2

Premium black-white fashion ecommerce starter for `ravenka.life`.

Included: professional admin dashboard, product CRUD, image upload endpoint, categories, size/color variants with stock, vouchers, flash sales, order management, Midtrans Snap checkout + notification signature verification, RajaOngkir/Komerce shipping-cost integration, SEO metadata/sitemap/robots, responsive storefront.

## Run
1. Node 20+
2. `cp .env.example .env` and fill credentials.
3. `npm install`
4. `npx prisma generate && npm run db:push && npm run db:seed`
5. `npm run dev`

Admin: `/admin`.

## Midtrans
Set `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION=false` for sandbox. Configure notification URL: `https://ravenka.life/api/midtrans/notification`.

## Shipping
Current RajaOngkir/Komerce Shipping Cost V2 uses `RAJAONGKIR_API_KEY`, `RAJAONGKIR_BASE_URL`, and `STORE_ORIGIN_ID`. The API key stays server-side.

## Production
For real launch use PostgreSQL/MySQL, persistent object storage (S3/R2/Cloudinary) instead of local uploads, rate limiting, 2FA, atomic stock reservation, transactional voucher usage, customer auth, email/WhatsApp notifications, courier delivery/AWB API, backups, monitoring, legal pages, and HTTPS/Cloudflare.

# InfoAxon website

React/Vite frontend with an Express API, PostgreSQL, and Prisma.

## Local setup

1. Install Node.js 20+ and PostgreSQL.
2. Create a PostgreSQL database named `infoaxon`.
3. Copy `server/.env.example` to `server/.env` (or provide the variables in your shell). Set a strong `DATABASE_URL`, `JWT_SECRET`, and `INITIAL_ADMIN_PASSWORD`.
4. Generate the client and apply the migration:

   ```bash
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

   For the requested initial login, set `INITIAL_ADMIN_PASSWORD` to the supplied deployment password only while running the seed. It is never stored in frontend or committed source; PostgreSQL stores a bcrypt hash.

5. Start both applications:

   ```bash
   npm run dev:all
   ```

The frontend runs on `http://localhost:5173`, the API on `http://localhost:5000`, and Vite proxies `/api` to the API. Uploaded images are stored in `server/uploads/` and served from `/uploads/...`.

## Production

Run `npm run build` for the frontend and `npm run server:prod` for the API. Configure `CLIENT_URL`, a strong JWT secret, the production PostgreSQL URL, and persistent storage for `server/uploads`.

Never commit `.env`, database credentials, JWT secrets, or plain-text passwords.

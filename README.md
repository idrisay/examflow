# ExamFlow

A modern exam practice platform starter built with Next.js, Tailwind CSS, TypeScript, and MongoDB.

## Features

- Public exam browsing without login
- Email/password authentication with cookie sessions
- Logged-in practice mode with saved attempts
- Document uploads stored in MongoDB
- Support / donation intent capture
- TELC-style starter content and modern UI

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env.local
```

3. Update `MONGODB_URI` and `JWT_SECRET` in `.env.local`

4. Run the dev server:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Notes

- The support flow currently stores contributions as records in MongoDB. You can connect Stripe or PayPal next.
- Uploads are stored in MongoDB as binary data for simplicity in this starter.
- Visiting `/api/exams` will seed starter exams and questions into MongoDB if the exam collection is empty.

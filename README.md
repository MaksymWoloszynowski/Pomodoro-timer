# Pomodoro App

A task management application with Pomodoro timer and review system.

---

## Features

- Create, edit, and delete tasks
- Track time spent on tasks
- View full task history
- Submit and view basic reviews

---

## Technologies

- Next.js
- React
- SCSS
- Prisma ORM
- PostgreSQL

---

## Requirements

- Node.js 18+
- A database (PostgreSQL, MySQL, or SQLite)
- Yarn or npm

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MaksymWoloszynowski/Pomodoro-timer.git
cd pomodoro-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up your .env.example file with your database connection, for example:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the server:
```bash
npm run dev
# or
yarn dev
```


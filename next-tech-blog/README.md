This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# This is a TechBlog.
This app retrieves data from Qiita and microCMS.
You can browse personal blogs.

## Features
 - 📝  Fetch and display articles from Qiita and microCMS.
 - 🚀 Optimized for performance with Next.js and Tailwind CSS


## Technology Used
  "next": "15.1.5"
  "react": "^19.0.0"
  "tailwindcss": "3.4.17"
If you want to see detail technology, run 'npm list' in this app.
  ### deploy
  "vercel"
  ### CI/CD
  "github action"


## Getting Started
npm install
npm run dev

This app requires environment variables.
Please create an `.env` file with the following contents:
```
QIITA_TOKEN
NEXT_PUBLIC_API_URL
MICRO_CMS_SERVICE_ID
MICRO_CMS_API_KEY
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


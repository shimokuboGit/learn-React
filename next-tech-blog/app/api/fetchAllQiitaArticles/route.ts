import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

type responseJson = {
  id: string;
  title: string;
  date: string;
  url: string;
  thumbnail: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
      headers: {
        'Authorization': `Bearer ${process.env.QIITA_TOKEN}`,
      }
    })
    if (!result.ok) {
      throw new Error(`Error: ${result.statusText}`)
    }
  
    const data = await result.json()
    const responseData: responseJson = data.map((d: { id: any; title: any; created_at: any; url: any; }) => ({
      id: d.id,
      title: d.title,
      date: d.created_at,
      url: d.url,
      thumbnail: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a",
    }))
    return NextResponse.json({ data: responseData });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

type responseJosn = {
  id: string;
  title: string;
  date: string;
  url: string;
  thumbnail: string;
}

export async function GET() {
  try {
    const result = await fetch('https://ujmy0b3t91.microcms.io/api/v1/blogs?limit=4', {
      headers: {
        'X-MICROCMS-API-KEY': 'pn7QeLEAElBWhoI82E57nqkN3zoT5IRn0XdC'
      }
    })
    if (!result.ok) {
      throw new Error(`Error: ${result.statusText}`)
    }
    
    const data = await result.json()
    const responseData: responseJosn = data.contents.map((d: { id: string; title: string; createdAt: string; thumbnail: { url: string; }; }) => ({
      id: d.id,
      title: d.title,
      date: d.createdAt,
      url: `/blogs/${d.id}`,
      thumbnail: d.thumbnail.url
    }))
    return NextResponse.json({ data: responseData })
  } catch (error) {
    return NextResponse.json({ error: error }, {status: 500})
  }
}

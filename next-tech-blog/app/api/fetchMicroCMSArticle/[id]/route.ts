import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.split('/fetchMicroCMSArticle/')[1]
  
  try {
    const result = await fetch(`https://ujmy0b3t91.microcms.io/api/v1/blogs/${id}`, {
      headers: {
        'X-MICROCMS-API-KEY': 'pn7QeLEAElBWhoI82E57nqkN3zoT5IRn0XdC'
      }
    })
    if (!result.ok) {
      throw new Error(`Error ${result.statusText}`)
    }
    const data = await result.json()
    const responseData = {
      id: data.id,
      title: data.title,
      date: data.createdAt,
      url: `https://ujmy0b3t91.microcms.io/apis/blogs/${data.id}`,
      thumbnail: data.thumbnail.url
    }
    return NextResponse.json({ data: responseData })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
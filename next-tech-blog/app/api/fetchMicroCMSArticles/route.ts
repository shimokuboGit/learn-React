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
    // const result = await fetch('https://ujmy0b3t91.microcms.io/api/v1/blogs?limit=4', {
    //   headers: {
    //     'X-MICROCMS-API-KEY': 'pn7QeLEAElBWhoI82E57nqkN3zoT5IRn0XdC'
    //   }
    // })
    // if (!result.ok) {
    //   console.log(`Error: ${result.statusText}`)
    //   return NextResponse.json({ data: [] })
    // }
    
    // const data = await result.json()
    const data = {
      contents: [
        {
          id: "article-1",
          title: "Reactの基本を学ぼう",
          createdAt: "2024-03-03T12:00:00Z",
          thumbnail: { url: "https://images.unsplash.com/photo-1740765979831-2419b29c7cc1?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        },
        {
          id: "article-2",
          title: "Next.jsのSSRとISRの違い",
          createdAt: "2024-03-02T10:30:00Z",
          thumbnail: { url: "https://images.unsplash.com/photo-1740765979831-2419b29c7cc1?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        },
        {
          id: "article-3",
          title: "TypeScriptで型安全なコードを書く",
          createdAt: "2024-03-01T08:15:00Z",
          thumbnail: { url: "https://images.unsplash.com/photo-1740765979831-2419b29c7cc1?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        },
        {
          id: "article-4",
          title: "APIからのデータ取得",
          createdAt: "2024-03-01T08:15:00Z",
          thumbnail: { url: "https://images.unsplash.com/photo-1740765979831-2419b29c7cc1?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        }
      ]
    }
    const responseData: responseJosn[] = data.contents.map((d: { id: string; title: string; createdAt: string; thumbnail: { url: string; }; }) => ({
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

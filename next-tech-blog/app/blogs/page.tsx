'use client'

import { useEffect, useState } from "react";
import { QiitaContent } from "../components/organisms/QiitaContent";

export default function AllArticle() {
  const [ article, setArticle ] = useState<ArticleContent[]>([])
  useEffect(() => {
    async function fetchArticle() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      const res = await(await fetch(`${API_URL}/api/fetchMicroCMSArticles`)).json()
      setArticle(res.data)
    }
    fetchArticle()
  }, [])

  return (
    <div>
      <h1>全ての記事</h1>
      <div className="grid grid-cols-4 gap-2">
        {article.map((a, index) => (
          <QiitaContent
            key={index}
            id={a.id}
            title={a.title}
            date={a.date}
            url={a.url}
            thumbnail={a.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}

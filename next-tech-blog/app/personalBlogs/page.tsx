'use client'

import { useEffect, useState } from "react"
import { QiitaContent } from '../components/organisms/QiitaContent';
import Title from "../components/atoms/Title";

export default function PersonalBlogs() {
  const [articles, setArticles] = useState<ArticleContent[]>([])

  useEffect(() => {
    async function fetchQiitaArticles() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      const res = await (await fetch(`${API_URL}/api/fetchAllQiitaArticles`)).json()
      setArticles(res.data)
    }
    fetchQiitaArticles()
  }, [])

  return (
    <div>
      <Title title="個人記事一覧" />
      <div className="p-4 pt-8">
        <div className="grid grid-cols-4 gap-2">
          {articles.map((m, index) => (
            <QiitaContent
              key={index}
              article={m}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

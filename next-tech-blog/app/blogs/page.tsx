'use client'

import { useEffect, useState } from "react";
import { QiitaContent } from "../components/organisms/QiitaContent";
import BackButton from "../components/atoms/BackButton";
import Title from "../components/atoms/Title";

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
      <Title title="全ての記事" />
      <div className="grid grid-cols-4 gap-2">
        {article.map((a, index) => (
          <QiitaContent
            key={index}
            article={a}
          />
        ))}
      </div>
      <BackButton />
    </div>
  )
}

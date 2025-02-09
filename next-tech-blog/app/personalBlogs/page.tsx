'use client'

import { useEffect, useState } from "react"
import { QiitaContent } from '../components/organisms/QiitaContent';
import Title from "../components/atoms/Title";
import BackButton from "../components/atoms/BackButton";
import { ArticleContent } from "../domain/ArticleContent";

export default function PersonalBlogs() {
  const [articles, setArticles] = useState<ArticleContent[]>([])

  useEffect(() => {
    async function fetchQiitaArticles() {
      const res = await (await fetch(`/api/fetchAllQiitaArticles`)).json()
      setArticles(res.data)
    }
    fetchQiitaArticles()
  }, [])

  return (
    <div>
      <Title title="個人記事一覧" />
      <div className="w-10/12">
        <div className="grid grid-cols-4 gap-2">
          {articles.map((m, index) => (
            <QiitaContent
              key={index}
              article={m}
            />
          ))}
        </div>
      </div>
      <BackButton />
    </div>
  )
}

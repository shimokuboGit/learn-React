'use client'

import { useEffect, useState } from "react";
import { QiitaContent } from "../components/organisms/QiitaContent";
import BackButton from "../components/atoms/BackButton";
import Title from "../components/atoms/Title";
import { ArticleContent } from "../domain/ArticleContent";

export default function AllArticle() {
  const [ article, setArticle ] = useState<ArticleContent[]>([])
  useEffect(() => {
    async function fetchArticle() {
      const res = await(await fetch(`/api/fetchMicroCMSArticles`)).json()
      setArticle(res.data)
    }
    fetchArticle()
  }, [])

  return (
    <div>
      <Title title="全ての記事" />
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-4 gap-2 justify-items-center">
          {article.map((a, index) => (
            <QiitaContent
              key={index}
              article={a}
            />
          ))}
        </div>
      </div>
      <BackButton />
    </div>
  )
}

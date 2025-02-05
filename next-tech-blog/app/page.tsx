'use client'

import { useEffect, useState } from "react";
import { QiitaContent } from "./components/organisms/QiitaContent";
import { useRouter } from "next/navigation";
import Title from "./components/atoms/Title";

export default function Home() {
  const router = useRouter()
  const [article, setArticle] = useState<ArticleContent[]>([])
  
  useEffect(() => {
    async function fetchArticles() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      const res = await (await fetch(`${API_URL}/api/fetchMicroCMSArticles`)).json()
      setArticle(res.data)
    }
    fetchArticles()
  }, [])

  return (
    <div>
      <Title title="ブログホーム" />
      <div className="grid grid-cols-4 gap-2">
        {article.map((a, index) => (
          <QiitaContent
            key={index}
            article={a}
          />
        ))}
      </div>
      <button className="btn m-4" onClick={() => router.push('blogs')}>もっとみる</button>
      <button className="btn m-4" onClick={() => router.push('personalBlogs')}>個人記事一覧</button>
    </div>
  );
}

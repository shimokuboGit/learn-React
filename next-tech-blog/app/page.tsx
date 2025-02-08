'use client'

import { useEffect, useState } from "react";
import { QiitaContent } from "./components/organisms/QiitaContent";
import { useRouter } from "next/navigation";
import Title from "./components/atoms/Title";
import { ArticleContent } from "./domain/ArticleContent";

export default function Home() {
  const router = useRouter()
  const [qiitaArticles, setQiitaArticles] = useState<ArticleContent[]>([])
  const [microCMSArticles, setMicroCMSArticles] = useState<ArticleContent[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  
  useEffect(() => {
    async function fetchMicroCMSArticles() {
      const res = await (await fetch(`${API_URL}/api/fetchMicroCMSArticles`)).json()
      setMicroCMSArticles(res.data)
    }

    async function fetchQiitaArticles() {
      const res = await (await fetch(`${API_URL}/api/fetchQiitaArticles`)).json()
      setQiitaArticles(res.data)
    }

    fetchMicroCMSArticles()
    fetchQiitaArticles()
  }, [])

  return (
    <div className="w-10/12 mx-auto">
      <div className="flex justify-between items-center pt-4">
        <Title title="個人記事" />
        <button className="btn m-4" onClick={() => router.push('personalBlogs')}>個人記事一覧</button>
      </div>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {qiitaArticles.map((a, index) => (
          <QiitaContent
            key={index}
            article={a}
          />
        ))}
      </div>
      <div className="flex justify-between items-center pt-4">
        <Title title="ブログ記事" />
        <button className="btn m-4" onClick={() => router.push('blogs')}>もっとみる</button>
      </div>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {microCMSArticles.map((a, index) => (
          <QiitaContent
            key={index}
            article={a}
          />
        ))}
      </div>
    </div>
  );
}

'use client'

import { useEffect, useState } from "react";
import Title from "./components/atoms/Title";
import { QiitaContent } from "./components/organisms/QiitaContent";
import { useRouter } from "next/navigation";

export default function Home() {
  const [article, setArticle] = useState<ArticleContent[]>([])
  
  useEffect(() => {
    async function fetchArticles() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      // const res = await (await fetch(`${API_URL}/api/fetchQiitaArticles`)).json()
      const res = await (await fetch(`${API_URL}/api/fetchMicroCMSArticles`)).json()
      setArticle(res.data)
    }
    fetchArticles()
  }, [])

  // const onClickReadAllArticle = () => {
  //   async function fetchArticles() {
  //     const API_URL = process.env.NEXT_PUBLIC_API_URL
  //     const res = await (await fetch(`${API_URL}/api/fetchAllQiitaArticles`)).json()
  //     setArticle(res.data)
  //   }
  //   fetchArticles()
  // }

  const router = useRouter()
  const onClickReadAllArticle = () => {
    router.push('/blogs')
  }

  return (
    <div>≈
      <Title />
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
      <button className="btn m-4" onClick={onClickReadAllArticle}>もっとみる</button>
    </div>
  );
}

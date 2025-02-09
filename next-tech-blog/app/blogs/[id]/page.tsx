'use client'

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArticleContent } from '../../domain/ArticleContent';

export default function Page () {
  const router = useRouter()
  
  const { id } = useParams()
  const [ article, setArticle ] = useState<ArticleContent>()
  
  useEffect(() => {
    async function fetchMicroCMSArticle() {
      const article = await(await fetch(`/api/fetchMicroCMSArticle/${id}`)).json()
      setArticle(article.data)
    }
    fetchMicroCMSArticle()
  }, [id])


  return (
    <div className="p-4">
      <h1 className="text-4xl font-blod">{article?.title || "No Title"}</h1>
      {article?.thumbnail && <Image src={article.thumbnail} alt={article.title} width={600} height={300} />}
      <p>Published on: {article?.date ? new Date(article.date).toLocaleDateString() : "Unknown Date"}</p>
      <a href={article?.url} target="_blank" rel="noopener noreferrer">
        サイトへ移動
      </a>
      <button className="btn m-4" onClick={() => router.push(`${article?.url}`)}>サイトへ</button>
    </div>
  )
}

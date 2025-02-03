type Props = {
  params: { id: string }
}

export default async function Page ({ params }: Props) {
const { id } = params

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const article = await fetch(`${API_URL}/api/fetchMicroCMSArticle/${id}`).then(async (res) => {
    return await res.json()
  })

  return (
    <div className="p-4">
      <h1 className="text-4xl font-blod">{article.data?.title || "No Title"}</h1>
      {article.data?.thumbnail && <img src={article.data.thumbnail} alt={article.data.title} width={600} />}
      <p>Published on: {article.data?.date ? new Date(article.data.date).toLocaleDateString() : "Unknown Date"}</p>
      <a href={article.data?.url} target="_blank" rel="noopener noreferrer">
        サイトへ移動
      </a>
    </div>
  )
}

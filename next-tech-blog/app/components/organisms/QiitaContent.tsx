type QiitaContentProps = {
  article: ArticleContent;
}

export const QiitaContent = ({article}: QiitaContentProps) => {
  const { id, title, date, url, thumbnail } = article;
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <a href={`${url}`} target="_blank">
        <figure>
          <img
            src={thumbnail}
            alt="qiita-thumbnail" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{date}</p>
        </div>
      </a>
    </div>
  )
}
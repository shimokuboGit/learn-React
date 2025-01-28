type QiitaContentProps = {
  title: string;
  date: string;
  url: string;
  thumbnail: string;
}

export const QiitaContent = ({title, date, url, thumbnail}: QiitaContentProps) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <a href={url} target="_blank">
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
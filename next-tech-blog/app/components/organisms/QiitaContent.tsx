import { ArticleContent } from "@/app/domain/ArticleContent";
import Image from "next/image";

type QiitaContentProps = {
  article: ArticleContent;
}

export const QiitaContent = ({article}: QiitaContentProps) => {
  const { title, date, url, thumbnail } = article;
  return (
    <div className="card card-compact bg-base-100 w-50 max-h-50 shadow-xl">
      <a href={`${url}`} target="_blank">
        <figure>
          <Image
            src={thumbnail}
            width={300}
            height={30}
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
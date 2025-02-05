type TitleProps = {
  title: string;
}

export default function Title(props: TitleProps) {
  const { title } = props
  return (
    <h1 className="text-3xl font-bold">{title}</h1>
  )
}
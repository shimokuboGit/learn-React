import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return(
    <button className="btn m-4" onClick={() => router.back()}>戻る</button>
  )
}

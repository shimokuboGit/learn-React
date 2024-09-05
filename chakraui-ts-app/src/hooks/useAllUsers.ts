import axios from "axios"
import { useCallback, useState } from "react"
import { User } from "../types/api/user"
import { useMessage } from "./useMessage"

export const useAllUsers = () => {
  
  const { showMessage } = useMessage()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Array<User>>([])

  const getUsers = useCallback(() => {
    axios.get<Array<User>>(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => {
      setLoading(true)
      setUsers(res.data)
    })
    .catch(() => {
      showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return { getUsers, loading, users }
}
export class Todo {
  constructor (
    public id: string,
    public title: string,
    public done: boolean,
    public created_at: string
  ) {}

  public static newTodo (
    id: string,
    title: string,
    done: boolean,
    created_at: string
  ): Todo {
      return new Todo (
        id,
        title,
        done,
        formatDate(created_at)
    )
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // 各パーツを取得
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  // フォーマットして返す
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

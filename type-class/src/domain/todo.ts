export class Todo {
  constructor (
    public id: string,
    public title: string,
    public done: boolean,
    public created_at: string
  ) {}
}

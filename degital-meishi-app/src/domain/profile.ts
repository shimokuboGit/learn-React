export class Profile {
  constructor (
    public id: string,
    public name: string,
    public description: string,
    public github_id: string | null,
    public qiita_id: string| null,
    public x_id: string | null,
    public created_at: string,
    public skills: Array<string> | null
  ) {}

  public static newProfile (
    id: string,
    name: string,
    description: string,
    github_id: string | null = null,
    qiita_id: string | null = null,
    x_id: string | null = null,
    created_at: string,
    skills: Array<string> | null = null
  ): Profile {
    return new Profile (
      id,
      name,
      description,
      createGithubLink(github_id),
      createQiitaLink(qiita_id),
      createXLink(x_id),
      formatDate(created_at),
      skills,
    )
  }
}

function formatDate(stringDate: string) :string {
  const date = new Date(stringDate)

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function createGithubLink(githubId: string | null) :string | null {
  return githubId === null ? null : `https://github.com/${githubId}`;
}

function createQiitaLink(qiitaId: string | null): string | null {
  return qiitaId === null ? null : `https://qiita.com/${qiitaId}`;
}

function createXLink(xId: string | null): string | null {
  return xId === null ? null : `https://twitter.com/${xId}`;
}
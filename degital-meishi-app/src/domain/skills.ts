export class Skills {
  constructor (
    public names: Array<string>
  ) {}

  public static newSkills (
    names: Array<string>
  ): Skills {
    return new Skills (
      names
    )
  }
}

export class LearnRecord {
  id?: string;
  title?: string;
  time?: number;

  constructor(init?: Partial<LearnRecord>) {
    Object.assign(this, init)
  }
}

export type LearnRecords = LearnRecord[]
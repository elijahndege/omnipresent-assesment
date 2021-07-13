export class Company {
  constructor(intialData: Partial<Company> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  id: number;
  name: string;
}

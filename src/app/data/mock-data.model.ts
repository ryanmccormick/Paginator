export class MockData {
  id: string;
  item: string;

  constructor(id?: string, item?: string) {
    this.id = id;
    this.item = item;
  }

  public static getInstance(obj: MockData): MockData {
    try {
      const {id, item} = obj;
      return new MockData(id, item);
    } catch (exception) {
      console.error(exception);
    }
  }

}

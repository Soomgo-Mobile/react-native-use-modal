export class ModalIdGenerator {
  private static INSTANCE: ModalIdGenerator | null = null;

  private lastId: number = 1;

  private constructor() {}

  static getInstance() {
    if (ModalIdGenerator.INSTANCE === null) {
      ModalIdGenerator.INSTANCE = new ModalIdGenerator();
    }
    return ModalIdGenerator.INSTANCE;
  }

  generate() {
    return ++this.lastId;
  }
}

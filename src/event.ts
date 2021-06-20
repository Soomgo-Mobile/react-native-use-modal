export class Event<T = void> {
  value: T;

  constructor(...[value]: T extends void ? [] : [T]) {
    // @ts-ignore
    this.value = value;
  }
}

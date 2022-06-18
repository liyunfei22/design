interface Iterator<T> {
  current: T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}
interface Aggregator {
  getIterator(): Iterator<string>;
}

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection;
  private position: number = 0;
  private reverse: boolean = false;
  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;
    if (this.reverse) {
      this.position = collection.getCount() - 1;
    }
  }
  public rewind(): void {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }
  public key(): number {
    return this.position;
  }
  public next(): string {
    const current = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return current;
  }
}

class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): Iterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}
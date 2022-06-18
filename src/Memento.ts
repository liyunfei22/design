// 备忘录是一种行为设计模式， 允许生成对象状态的快照并在以后将其还原。

// 发起人 （Originator） 类可以生成自身状态的快照， 也可以在需要时通过快照恢复自身状态。
class Originator {
  private state: string;
  constructor(state: string) {
    this.state = state;
  }
  public doSomething(): void {
    this.state = this.generateRandomString();
    console.log(`State: ${this.state}`);
  }
  private generateRandomString(length: number = 10): string {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.apply(null, Array(length))
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join("");
  }
  public save(): Memento {
    return new ConcreteMemento(this.state);
  }
  public restore(memento: Memento): void { 
    this.state = memento.getState();
    console.log(`State: ${this.state}`);
  }
}
// 备忘录 （Memento） 是发起人状态快照的值对象 （value object）。 通常做法是将备忘录设为不可变的， 并通过构造函数一次性传递数据。
interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}
class ConcreteMemento implements Memento {
  private state: string;
  private date: string;
  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
  public getState(): string {
    return this.state;
  }
  public getName(): string {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }
  public getDate(): string {
    return this.date;
  }
}
// 管理者 （Caretaker） 仅知道 “何时” 和 “为何” 捕捉发起人的状态， 以及何时恢复状态。
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;
  constructor(originator: Originator) { 
    this.originator = originator;
  }
  public backup(): void { 
    this.mementos.push(this.originator.save());
  }
  public undo(): void { 
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    this.originator.restore(memento as Memento);
  }
  public showHistory(): void { 
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}
const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);
caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();
console.log("");
caretaker.showHistory();
console.log("\nClient: Now, let's rollback!\n");
caretaker.undo();

console.log("\nClient: Once more!\n");
caretaker.undo();

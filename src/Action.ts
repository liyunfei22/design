/**
 * 命令模式是一种行为设计模式， 它可将请求转换为一个包含与请求相关的所有信息的独立对象。 该转换让你能根据不同的请求将方法参数化、 延迟请求执行或将其放入队列中， 且能实现可撤销操作。
 * http://shusheng007.top/2021/09/08/027/
 * */ 
interface Command {
  execute(): void;
}
// 接收者 （Receiver） 类包含部分业务逻辑。 几乎任何对象都可以作为接收者。 绝大部分命令只处理如何将请求传递到接收者的细节， 接收者自己会完成实际的工作。
class Receiver {
  public doSomething(a: string): void {
    console.log(`${a}`);
  }
  public doSomethingElse(a: string): void {
    console.log(`${a}`);
  }
}
// “触发者 （Invoker）”——类负责对请求进行初始化， 其中必须包含一个成员变量来存储对于命令对象的引用。 
class Invoker {
  private onStart: Command | null = null;
  private onFinish: Command | null = null;
  public setOnStart(command: Command): void {
    this.onStart = command;
  }
  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }
  public doSomethingImportant(): void { 
    if(this.isCommand(this.onStart)) {
      this.onStart.execute();
    }
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }
  private isCommand(object: any): object is Command {
    return object.execute !== undefined;
  }
}
class SimpleCommand implements Command {
  private payload: string;
  constructor(payload: string) {
    this.payload = payload;
  }
  public execute(): void {
    console.log(`SimpleCommand: Handling ${this.payload}`);
  }
}
class ComplexCommand implements Command {
  private receiver: Receiver;
  private a: string;
  private b: string;
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }
  public execute(): void {
    console.log(`ComplexCommand: Handling`)
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();

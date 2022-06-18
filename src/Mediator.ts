/**
 * 中介者是一种行为设计模式， 让程序组件通过特殊的中介者对象进行间接沟通， 达到减少组件之间依赖关系的目的。
 * */ 

// 中介者 （Mediator） 接口声明了与组件交流的方法， 但通常仅包括一个通知方法。 组件可将任意上下文 （包括自己的对象） 作为该方法的参数， 只有这样接收组件和发送者类之间才不会耦合。

// 组件并不知道其他组件的情况。 如果组件内发生了重要事件， 它只能通知中介者。 中介者收到通知后能轻易地确定发送者， 这或许已足以判断接下来需要触发的组件了。

// 对于组件来说， 中介者看上去完全就是一个黑箱。 发送者不知道最终会由谁来处理自己的请求， 接收者也不知道最初是谁发出了请求。
interface Mediator {
  notify(sender: object, event: string): void;
}
// 具体中介者 （Concrete Mediator） 封装了多种组件间的关系。 具体中介者通常会保存所有组件的引用并对其进行管理， 甚至有时会对其生命周期进行管理。

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;
  constructor(component1: Component1, component2: Component2) {
    this.component1 = component1;
    this.component2 = component2;
    component1.setMediator(this);
    component2.setMediator(this);
  }
  public notify(sender: object, event: string): void {
     if (event === "A") {
       console.log("Mediator reacts on A and triggers following operations:");
       this.component2.doC();
     }

     if (event === "D") {
       console.log("Mediator reacts on D and triggers following operations:");
       this.component1.doB();
       this.component2.doC();
     }
  }
}
// 组件 （Component） 是各种包含业务逻辑的类。 每个组件都有一个指向中介者的引用， 该引用被声明为中介者接口类型。 
// 组件不知道中介者实际所属的类， 因此你可通过将其连接到不同的中介者以使其能在其他程序中复用。


class BaseComponent {
  protected mediator: Mediator | null = null;
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}
class Component1 extends BaseComponent { 
  public doA(): void {
    console.log('Component 1 does A.');
    this.mediator?.notify(this, 'A');
  }
  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator?.notify(this, 'B');
  }
}
class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator?.notify(this, 'C');
  }
  public doD(): void {
    console.log('Component 2 does D.');
    this.mediator?.notify(this, 'D');
  }
}

const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);
console.log("Client triggers operation A.");
c1.doA();

console.log("Client triggers operation A.");
c1.doA();

console.log("");
console.log("Client triggers operation D.");
c2.doD();

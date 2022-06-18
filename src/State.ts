/**
 * 状态模式是一种行为设计模式， 让你能在一个对象的内部状态变化时改变其行为， 使其看上去就像改变了自身所属的类一样。
 * 状态（State）模式的定义：对有状态的对象，把复杂的“判断逻辑”提取到不同的状态对象中，允许状态对象在其内部状态发生改变时改变其行为。
 * 状态模式把受环境改变的对象行为包装在不同的状态对象里，其意图是让一个对象在其内部状态改变的时候，其行为也随之改变。现在我们来分析其基本结构和实现方法。

 * */ 
// 状态 （State） 接口会声明特定于状态的方法。 这些方法应能被其他所有具体状态所理解， 因为你不希望某些状态所拥有的方法永远不会被调用。
// 抽象状态（State）角色：定义一个接口，用以封装环境对象中的特定状态所对应的行为，可以有一个或多个行为。

abstract class State {
  protected context: Context;
  constructor(context: Context) {
    this.context = context;
  }
  public setContext(context: Context): void {
    this.context = context;
  }
  public abstract handle1(): void;
  public abstract handle2(): void;

}
// 上下文 （Context） 保存了对于一个具体状态对象的引用， 并会将所有与该状态相关的工作委派给它。 上下文通过状态接口与状态对象交互， 且会提供一个设置器用于传递新的状态对象。
// 环境类（Context）角色：也称为上下文，它定义了客户端需要的接口，内部维护一个当前状态，并负责具体状态的切换。
class Context {
  private state: State;
  constructor(state: State) {
    this.state = state;
    this.transitionTo(state);
  }
  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);  
  }
  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}
// 具体状态（Concrete State）角色：实现抽象状态所对应的行为，并且在需要的情况下进行状态切换。
class ConcreteStateA extends State { 
  public handle1(): void { 
    console.log("ConcreteStateA");
    this.context.transitionTo(new ConcreteStateB(this.context));
  }
  public handle2(): void { 
    console.log("ConcreteStateA");
  }
}
class ConcreteStateB extends State {
  public handle1(): void {
    console.log("ConcreteStateA");
  }
  public handle2(): void {
    console.log("ConcreteStateA");
    this.context.transitionTo(new ConcreteStateA(this.context));
  }
}
/**
 * The client code.
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
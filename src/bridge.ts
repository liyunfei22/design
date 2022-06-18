/**
 * 看廖雪峰的文章，讲的比较明白：https://www.liaoxuefeng.com/wiki/1252599548343744/1281319266943009
 * 桥接模式是一种结构型设计模式， 可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构， 从而能在开发时分别使用。
 * 问题的根本原因是我们试图在两个独立的维度——形状与颜色——上扩展形状类。 这在处理类继承时是很常见的问题。
 * 桥接模式通过将继承改为组合的方式来解决这个问题。 具体来说， 就是抽取其中一个维度并使之成为独立的类层次， 这样就可以在初始类中引用这个新层次的对象， 从而使得一个类不必拥有所有的状态和行为。
 */ 
// 实现部分;
interface Implementation {
  operationImplementation(): string;
}
// 抽象部分 （Abstraction） 提供高层控制逻辑， 依赖于完成底层实际工作的实现对象。
class Abstraction {
  protected implementation: Implementation;
  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = super.operation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}
// 实现部分;

class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform of operationA.";
  }
}
// 实现部分;

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform of operationB.";
  }
}
export function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);

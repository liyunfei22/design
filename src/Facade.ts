/** 
 * 外观是一种结构型设计模式， 能为复杂系统、 程序库或框架提供一个简单 （但有限） 的接口。
 * 尽管外观模式降低了程序的整体复杂度， 但它同时也有助于将不需要的依赖移动到同一个位置。
 * */ 
// 外观 （Facade） 提供了一种访问特定子系统功能的便捷方式， 其了解如何重定向客户端请求， 知晓如何操作一切活动部件。
class Facade {
  protected system1: Subsystem1;
  protected system2: Subsystem2;
  constructor(system1: Subsystem1, system2: Subsystem2) {
    this.system1 = system1;
    this.system2 = system2;
  }
  public operation(): string { 
    let result = "Facade initializes subsystems:\n";
    result += this.system1.operation1();
    result += this.system2.operation1();
    result += "Facade orders subsystems to perform the action:\n";
    result += this.system1.operationN();
    result += this.system2.operationZ();
    return result;
  }
}
class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Ready!\n";
  }

  // ...

  public operationN(): string {
    return "Subsystem1: Go!\n";
  }
}
class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: Ready!\n";
  }

  // ...

  public operationZ(): string {
    return "Subsystem2: Fire!\n";
  }
}
export function clientCode(facade: Facade) {
  // ...

  console.log(facade.operation());

  // ...
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
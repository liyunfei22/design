/**
 * 在面向对象程序设计过程中，程序员常常会遇到这种情况：设计一个系统时知道了算法所需的关键步骤，而且确定了这些步骤的执行顺序，但某些步骤的具体实现还未知，或者说某些步骤的实现与具体的环境相关。
这样的例子在生活中还有很多，例如，一个人每天会起床、吃饭、做事、睡觉等，其中“做事”的内容每天可能不同。我们把这些规定了流程或格式的实例定义成模板，允许使用者根据自己的需求去更新它，例如，简历模板、论文模板、Word 中模板文件等。

 * */ 
// 抽象类 （Abstract­Class） 会声明作为算法步骤的方法， 以及依次调用它们的实际模板方法。 算法步骤可以被声明为 抽象类型， 也可以提供一些默认实现。
abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }
  protected baseOperation1(): void {
    console.log("AbstractClass: Base Operation 1");
  }
  protected baseOperation2(): void {
    console.log("AbstractClass: Base Operation 2");
  }
  protected baseOperation3(): void {
    console.log("AbstractClass: Base Operation 3");
  }
  protected abstract requiredOperations1(): void;
  protected abstract requiredOperation2(): void;
  protected hook1(): void {
    console.log("AbstractClass: Hook 1");
  }
  protected hook2(): void {
    console.log("AbstractClass: Hook 2");
  }
}
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log("ConcreteClass1 says: Implemented Operation1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClass1 says: Implemented Operation2");
  }
}
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log("ConcreteClass2 says: Implemented Operation1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClass2 says: Implemented Operation2");
  }

  protected hook1(): void {
    console.log("ConcreteClass2 says: Overridden Hook1");
  }
}
export function clientCode(abstractClass: AbstractClass) {
  // ...
  abstractClass.templateMethod();
  // ...
}
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass1());
console.log("");
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass2());


/**
 * 装饰模式是在不必改变原类和使用继承的情况下，动态地扩展一个对象的功能。它是通过创建一个包装对象，也就是装饰来包裹真实的对象
 * 装饰模式是一种结构型设计模式， 允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。 
 *    封装器是装饰模式的别称， 这个称谓明确地表达了该模式的主要思想。
 *  “封装器” 是一个能与其他 “目标” 对象连接的对象。 封装器包含与目标对象相同的一系列方法， 它会将所有接收到的请求委派给目标对象。 
 *   但是， 封装器可以在将请求委派给目标前后对其进行处理， 所以可能会改变最终结果。
 * 
 */
// 声明一个原始对象的接口
// 部件 （Component） 声明封装器和被封装对象的公用接口。
interface Component {
  operation(): string;
}
// 原始对象
// 具体部件 （Concrete Component） 类是被封装对象所属的类。 它定义了基础行为， 但装饰类可以改变这些行为。
class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent'
  }
}
// 构建装饰者抽象基类，它要实现与原始对象相同的接口，其内部持有一个类型的引用，用来接收被装饰的对象
// 基础装饰 （Base Decorator） 类拥有一个指向被封装对象的引用成员变量。 该变量的类型应当被声明为通用部件接口， 这样它就可以引用具体的部件和装饰。 装饰基类会将所有操作委派给被封装的对象。
class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  public operation(): string {
    return this.component.operation();
  }
}
// 构建各种装饰者类，他们都继承至装饰者基类
// 具体装饰类 （Concrete Decorators） 定义了可动态添加到部件的额外行为。 具体装饰类会重写装饰基类的方法， 并在调用父类方法之前或之后进行额外的行为。
class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA: ${super.operation()}`;
  }
}

// 构建各种装饰者类，他们都继承至装饰者基类
 class ConcreteDecoratorB extends Decorator {
   public operation(): string {
     return `ConcreteDecoratorB: ${super.operation()}`;
   }
 }
 export function clientCode(component: Component) {
   console.log(component.operation());
 }
const simple = new ConcreteComponent();
clientCode(simple);

// 客户端 （Client） 可以使用多层装饰来封装部件， 只要它能使用通用接口与所有对象互动即可。
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
clientCode(decorator2);
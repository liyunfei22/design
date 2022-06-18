class Target {
  public request(): string {
    return "Target: The default target's behavior.";
  }
}
class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}
// 适配器 （Adapter） 是一个可以同时与客户端和服务交互的类： 它在实现客户端接口的同时封装了服务对象。 适配器接受客户端通过适配器接口发起的调用， 并将其转换为适用于被封装服务对象的调用。


class Adapter extends Target {
  private adaptee: Adaptee;
  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }
  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
   }
}
export function clientCode(target: Target) {
  console.log(target.request());
}
console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
clientCode(target);
console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(new Adaptee());
clientCode(adapter);

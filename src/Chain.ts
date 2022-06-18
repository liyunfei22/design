// 行为模式负责对象间的高效沟通和职责委派。

/** 
 * 责任链模式是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。
 * http://shusheng007.top/2021/09/08/026/
*/
interface Handler { 
  setNext(handler: Handler): Handler;
  handle(request: string): string | void;
}
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  public handle(request: string) { 
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
  }
}
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string | void {
    if (request === "banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}
class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string | void{
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}
class DogHandler extends AbstractHandler {
  public handle(request: string): string | void{
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}
export function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];
  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);
    const result = handler.handle(food);
    if (result) {
      console.log(result);
    } else {
      console.log(`Client: ${food} was left untouched.`);
    }
  }
}
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();
monkey.setNext(squirrel).setNext(dog);
clientCode(monkey);
clientCode(squirrel);

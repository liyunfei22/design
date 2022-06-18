// 享元 （Flyweight） 类包含原始对象中部分能在多个对象中共享的状态。 同一享元对象可在许多不同情景中使用。 享元中存储的状态被称为 “内在状态”。 传递给享元方法的状态被称为 “外在状态”。
class Flyweight {
  private sharedState: any;
  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }
  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}
// 享元工厂 （Flyweight Factory） 会对已有享元的缓存池进行管理。 有了工厂后， 客户端就无需直接创建享元， 它们只需调用工厂并向其传递目标享元的一些内在状态即可。 工厂会根据参数在之前已创建的享元中进行查找， 如果找到满足条件的享元就将其返回； 如果没有找到就根据参数新建享元。
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};
  constructor(initialFlyweight: string[][]) {
    for (const state of initialFlyweight) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }
  private getKey(state: string[]) {
    return state.join("_");
  }
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);
    if (!(key in this.flyweights)) {
      this.flyweights[key] = new Flyweight(sharedState);
    }
    return this.flyweights[key];
  }
  public listFlyweights(): void { 
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(`Flyweight: ${key}`);
    }
  }
}
const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
]);
factory.listFlyweights();
// 构建者的抽象基类
interface Builder {
  productPartA(): void;
  productPartB(): void;
  productPartC(): void;
}
// Product: 最终要生成的对象，例如 Computer实例。
class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}
// ConcreteBuilder: Builder的实现类。
class ConcreteBuilder1 implements Builder {
  private product!: Product1;
  constructor() {
    this.reset();
  }
  public reset(): void {
    this.product = new Product1();
  }
  public productPartA(): void {
    this.product.parts.push("PartA1");
  }
  public productPartB(): void {
    this.product.parts.push("Part B1");
  }
  public productPartC(): void {
    this.product.parts.push("Part C1");
  }
  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}
// 决定如何构建最终产品的算法
class Director {
  private builder!: Builder;
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }
  public buildMinimalViableProduct(): void {
    this.builder.productPartA();
  }
  public buildFullFeaturedProduct(): void {
    this.builder.productPartA();
    this.builder.productPartB();
    this.builder.productPartC();
  }
}
function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);
  director.buildMinimalViableProduct();
  director.buildFullFeaturedProduct();
  const product1 = builder.getProduct();
}
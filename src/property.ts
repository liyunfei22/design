
// 使用原型实例指定待创建对象的类型，并且通过复制这个原型来创建新的对象。
/** 
 * 使用场景 
 *    当一个对象的构建代价过高时。例如某个对象里面的数据需要访问数据库才能拿到，而我们却要多次构建这样的对象。 
 *    当构建的多个对象，均需要处于某种原始状态时，就可以先构建一个拥有此状态的原型对象，其他对象基于原型对象来修改。
 * 
*/
class Property {
  public primitive: any;
  public component!: object;
  public circularReference!: ComponentWithBackReference;
  public clone(): Property {
    const clone = new Property();
    clone.primitive = this.primitive;
    clone.component = Object.create(this.component);
    clone.circularReference = {
      ...this.circularReference,
      property: {
        ...this,
      },
    };
    return clone;
  }
}
class ComponentWithBackReference {
  public property;
  constructor(property: Property) {
    this.property = property;
  }
}
function clientCode() {
  const p1 = new Property();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);
  const p2 = p1.clone();

}
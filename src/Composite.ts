/**
 * 组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。
 * 
 * */ 
// 组件 （Component） 接口描述了树中简单项目和复杂项目所共有的操作。
abstract class Component {
  protected parent: Component | null = null;
  public setParent(parent: Component | null): void { 
    this.parent = parent;
  }
  public getParent(): Component | null { 
    return this.parent;
  }
  public add(component: Component): void {};
  public remove(component: Component): void { };
  public isComposite(): boolean { return false; };
  public abstract operation(): string;
}
// 叶节点 （Leaf） 是树的基本结构， 它不包含子项目。
// 一般情况下， 叶节点最终会完成大部分的实际工作， 因为它们无法将工作指派给其他部分。
class Leaf extends Component {
  public operation(): string { 
    return 'Leaf';
  }
}
// 容器 （Container）——又名 “组合 （Composite）”——是包含叶节点或其他容器等子项目的单位。 容器不知道其子项目所属的具体类， 它只通过通用的组件接口与其子项目交互。

// 容器接收到请求后会将工作分配给自己的子项目， 处理中间结果， 然后将最终结果返回给客户端。
class Composite extends Component {
  protected children: Component[] = [];
  public add(component: Component): void { 
    this.children.push(component);
  }
  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null)
  }
  public isComposite(): boolean { return true; };
  public operation(): string { 
    const result = [];
    for (const child of this.children) { 
      result.push(child.operation());
    }
    return result.join('+');
  }
}
// 容器 （Container）——又名 “组合 （Composite）”——是包含叶节点或其他容器等子项目的单位。 容器不知道其子项目所属的具体类， 它只通过通用的组件接口与其子项目交互。
// 容器接收到请求后会将工作分配给自己的子项目， 处理中间结果， 然后将最终结果返回给客户端。
export function clientCode(component: Component) {
  console.log(component.operation());
}
const simple = new Leaf();
clientCode(simple);
const tree = new Composite();
const branch1 = new Composite();
const branch2 = new Composite();
branch1.add(new Leaf());
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);


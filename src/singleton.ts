
class Singleton {
  private static instance:Singleton;
  private constructor() {}
  public static getInstance():Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  public add(a:number, b:number):number {
    return  a+b
  }
}
const singleton = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton === singleton2);
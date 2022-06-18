interface Subject {
  request(): void;
}
class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling request.");
  }
}
export class Proxy implements Subject {
  private realSubject: RealSubject;
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }
  private checkAccess(): boolean {
    // Some real checks should go here.
    console.log("Proxy: Checking access prior to firing a real request.");

    return true;
  }
  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}
export function clientCode(subject: Subject) {
  subject.request();
}

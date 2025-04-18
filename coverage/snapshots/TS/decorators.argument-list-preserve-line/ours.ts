class Foo {
  constructor(
    @inject(Bar)
    bar: IBar,

    @inject(MyProcessor)
    myProcessor: IMyProcessor,

    @inject(InjectionTypes.AnotherThing)
    anotherThing: IAnotherThing | undefined,
  ) {}
}

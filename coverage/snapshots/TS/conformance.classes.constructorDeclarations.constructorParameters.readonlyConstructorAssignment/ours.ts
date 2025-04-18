// Tests that readonly parameter properties behave like regular readonly properties

class A {
  constructor(x: number) {
    this.x = 0;
  }
}

class B extends A {
  constructor(x: number) {
    super(x);
    // Fails, x is readonly
    this.x = 1;
  }
}

class C extends A {
  // This is the usual behavior of readonly properties:
  // if one is redeclared in a base class, then it can be assigned to.
  constructor(x: number) {
    super(x);
    this.x = 1;
  }
}

class D {
  constructor(x: number) {
    this.x = 0;
  }
}

// Fails, can't redeclare readonly property
class E extends D {
  constructor(x: number) {
    super(x);
    this.x = 1;
  }
}

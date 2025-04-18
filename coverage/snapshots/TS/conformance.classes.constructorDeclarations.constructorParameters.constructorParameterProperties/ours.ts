class C {
  y: string;
  constructor(x: string, z: string) {}
}

var c: C;
var r = c.y;
var r2 = c.x; // error
var r3 = c.z; // error

class D<T> {
  y: T;
  constructor(a: T, x: T, z: T) {}
}

var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error
var r4 = d.z; // error

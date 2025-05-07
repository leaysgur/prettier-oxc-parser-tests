// @declaration: true
module M {
  module Q.P {} // This shouldnt be emitted
}

module M {
  export module S.R {} //This should be emitted
}

module U.T {
  // This needs to be emitted
}

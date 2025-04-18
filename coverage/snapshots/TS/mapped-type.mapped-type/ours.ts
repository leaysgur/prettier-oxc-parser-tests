type Keys = "option1" | "option2";
type A = { readonly [K in Keys]? };
type B = { readonly [K in Keys]+? };

type A = {
  // commentA
  readonly [a in A]?: string;
};

type B = {
  /* commentB */ readonly [b in B]?: string;
};

type C = {
  readonly [/* commentC */ c in C]?: string;
};

type D = {
  readonly [d /* commentD */ in D]?: string;
};

type E = {
  readonly [e in /* commentE */ E]?: string;
};

type F = {
  readonly [f in F /* commentF */]?: string;
};

type G = {
  readonly [g in G /* commentG */]?: string;
};

type H = { readonly [/* commentH */ h in H]?: string };

type I = { readonly [/* commentI */ i in I]?: string };

type J = { readonly [j /* commentJ */ in J]?: string };

type K = { readonly [k in /* commentK */ K]?: string };

type L = { readonly [l in L /* commentL */]?: string };

type M = { readonly [m in M /* commentG */]?: string };

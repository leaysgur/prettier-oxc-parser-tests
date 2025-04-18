type a = {
    // prettier-ignore
    [A in B]: C  |  D
  };

type a = {
    [
      // prettier-ignore
      A in B
    ]: C  |  D
  };

type a = {
  readonly [A in // prettier-ignore
  B]?: C | D;
};

type a = {
  readonly [A in B]?: // prettier-ignore
  C | D;
};

type a = {
    [
      /* prettier-ignore */
      A in B
    ]: C  |  D
  };

type a = {
  readonly [A in /* prettier-ignore */
  B]?: C | D;
};

type a = {
  readonly [A in B]?: /* prettier-ignore */
  C | D;
};

type a = {
    /* prettier-ignore */ [A in B]: C  |  D
  };

type a = {
    [/* prettier-ignore */ A in B ]: C  |  D
  };

type a = {
  readonly [A in /* prettier-ignore */ B]?: C | D;
};

type a = {
  readonly [A in B /* prettier-ignore */]?: C | D;
};

type a = {
    /* prettier-ignore */
    [A in B]: C  |  D
  };

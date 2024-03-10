import { styled } from "@mui/material";

const $w = "13em";
const $h = "19em";
const $f = `${$h} / ${$w}`;
const $n = 7;
const $g = "1em";
const $c0 = "#ff9528";
const $c1 = "#3f7ea6";

const int_ch = (ch0: string, ch1: string) => {
  return `calc(var(--i) * ${ch1} + var(--noti) * ${ch0})`;
};

const int_col = (c0: string, c1: string) => {
  const ch = ["red", "green", "blue"];
  let args = "";

  ch.forEach((fn) => {
    args += `, ${int_ch(`call(${fn}, ${c0})`, `call(${fn}, ${c1})`)}`;
  });

  return `RGB(${args})`;
};

export const OrderCard = styled("div")`
  overflow: hidden;
  position: relative;
  width: var(--w, ${$w});
  height: var(--h, ${$h});
  border-radius: 0.5em;
  box-shadow: 2px 2px 17px #000;
  background: linear-gradient(var(--ang, 180deg), ${$c0}, ${$c1});

  &,
  &:before,
  &:after {
    --strip-stop: 100%;
    --strip-f: 0.25;
    --strip-stop-0: calc(var(--strip-f) * var(--strip-stop));
    --strip-stop-1: calc(var(--strip-stop) - var(--strip-stop-0));
    --strip-end: red;
    --strip-mid: transparent;
    --strip-list: var(--strip-end) 0, var(--strip-end) var(--strip-stop-0),
      var(--strip-mid) 0, var(--strip-mid) var(--strip-stop-1),
      var(--strip-end) 0, var(--strip-end) var(--strip-stop);
    --joint-list: var(--joint-end, red) var(--joint-stop, 25%),
      var(--joint-mid, transparent) 0;
    --joint-0: linear-gradient(135deg, var(--joint-list));
    --joint-1: linear-gradient(-135deg, var(--joint-list));
    --joint-2: linear-gradient(-45deg, var(--joint-list));
    --joint-3: linear-gradient(45deg, var(--joint-list));
  }

  &:before,
  &:after {
    --i: 0;
    --noti: calc(1 - var(--i));
    --sgni: calc(2 * var(--i) - 1);
    --c: hsl(0, 0%, 0%, var(--i));
    --notc: hsl(0, 0%, 0%, var(--noti));
    --fill: linear-gradient(var(--c), var(--c));
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    --c0: ${int_col($c0, $c1)};
    --c1: ${int_col($c1, $c0)};
    -webkit-mask: var(--mask);
    mask: var(--mask);
    -webkit-mask-position: var(--mask-o, 50% 50%);
    mask-position: var(--mask-o, 50% 50%);
    -webkit-mask-size: var(--mask-d);
    mask-size: var(--mask-d);
  }

  &:after {
    --i: 1;
  }
`;

export const OrderContainer = styled("div")`
  --sqrt2: 1.41421356237;
  --h: ${$f} * var(--w);
  display: grid;
  grid-template-columns: repeat(var(--n, ${$n}), var(--w, ${$w}));
  grid-gap: ${$g};
  place-content: center;
  margin: 0;
  padding: 2vmin;
  min-width: ${$w};
  min-height: 100vh;
  background: #333;

  @media (max-width: calc((${$n} - var(--i) + 1) * var(--w) + (${$n} - var(--i) + 2) * ${$g})) {
    --n: ${$n - 1};
  }
`;

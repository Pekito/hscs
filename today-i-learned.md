## 1. Every possible move is reachable by just mapping one move and the three axis rotations

N2 = N -> N

N' = N -> N -> N ou N2 -> N

U = U

U2 = U -> U

U' = U -> U -> U ou U2 -> U

x = x

y = y

z = z

The formula to compute any clockwise move is `f(n) n U n'` where `n` is the axis being rotated\

L = f(z)\
F = f(x)\
R = f(z')\
B = f(x')\
D = f(x2)

## 2. Mirrored Moves

1. A mirrored move in the horizontal (y) axis is represented by `h(n) = y2 n' y2` with `n` being the move
2. A mirrored move in the vertical (x) axis is represented by having y2 as a setup to the horizontal mirror formula, describing horizontal as h(n), we have `v(n) = y2 f(n) y2`

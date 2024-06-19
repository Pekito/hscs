# 1. Todas as rotações são possíveis de serem alcançadas apenas com um movimento e as três rotações de eixo!!

```
N2 = N -> N
N' = N -> N -> N ou N2 -> N

U = U
U2 = U -> U
U' = U -> U -> U ou U2 -> U

x = x
y = y
z = z

A fórmula para computar qualquer movimento em sentido horário é
f(n) n U n'
onde n é um eixo que está sendo rotacionado;

L = f(z)
F = f(x)
R = x(z')
B = f(x')
D = f(x2)
```

#2 Movimentos espelhados

1. Um movimento espelhado no eixo horizontal é a aplicação da fórmula f(n) = y2 n' y2
2. Um movimento espelhado no eixo vertical é a aplicação da fórmula de f(n) sob y2, logo f(m) = y2 f(n)(m) y2
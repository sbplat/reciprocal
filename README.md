# Reciprocal Equation Solver

Find all unique positive integer solutions to a reciprocal equation of the form: $\frac{1}{x_1}+\frac{1}{x_2}+\ldots+\frac{1}{x_n}=k$. Try it out [here](https://sbplat.github.io/reciprocal/)!

## How does it work?

We use a combination of brute force and narrowing down the search space to find all the solutions.

Let's start with a simple example, with $n=2$ terms and the right hand side $k=1$. We are asked to solve the equation $\frac{1}{x_1}+\frac{1}{x_2}=1$.
Without loss of generality, let's assume $x_2\geq x_1\implies\frac{1}{x_2}\leq\frac{1}{x_1}$.
Then, we have the following inequalities:
```math
\tag{1}
\begin{aligned}
    1=\frac{1}{x_1}+\frac{1}{x_2}\leq\frac{1}{x_1}+\frac{1}{x_1}=\frac{2}{x_1}\implies x_1\leq 2
\end{aligned}
```
```math
\tag{2}
\begin{aligned}
    1=\frac{1}{x_1}+\frac{1}{x_2}\geq\frac{1}{x_2}+\frac{1}{x_2}=\frac{2}{x_2}\implies x_2\geq 2
\end{aligned}
```
Observe that $(1)$ is extremely crucial, while $(2)$ is not. This is because $(1)$ gives us an upper bound on $x_1$, and since $x_1$ is a positive integer, we just need to brute force all the values of $x_1$ in $[1, 2]$. This significantly narrows down the search space and makes it a much easier problem.

Now, what if $k$ is a rational number? We can still follow the same approach as above to narrow it down. There's only one extra step: we need to make sure the last term ($\frac{1}{x_2}$ in this case) is a reciprocal of a positive integer. If it's not, then it's not a solution.

Finally, what if we had $n=3$ terms and the right hand side $k\in\mathbb{Q}$? We can follow a similar approach and reach the conclusion that $x_1\leq\frac{3}{k}$. Recursively following this approach gives us an algorithm to find all the solutions. You can check out the implementation [here](https://github.com/sbplat/reciprocal/blob/main/js/index.js).

## How do I run this from source?

1. First, clone the repository and change into the directory:
```sh
git clone https://github.com/sbplat/reciprocal.git
cd reciprocal
```
2. Open `index.html` with your browser.

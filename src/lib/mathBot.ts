// Simulated AI math tutor that provides step-by-step solutions

interface MathResponse {
  solution: string;
  confidence: number;
}

export function solveMathQuestion(question: string): MathResponse {
  const q = question.toLowerCase().trim();

  // Pattern matching for common math problems
  if (q.includes("solve") || q.includes("find x") || q.includes("equation")) {
    return solveEquation(question);
  }
  if (q.includes("derivative") || q.includes("differentiat")) {
    return solveDerivative(question);
  }
  if (q.includes("integral") || q.includes("integrat")) {
    return solveIntegral(question);
  }
  if (q.includes("area") || q.includes("perimeter") || q.includes("volume")) {
    return solveGeometry(question);
  }
  if (q.includes("probability")) {
    return solveProbability(question);
  }
  if (q.includes("factor")) {
    return solveFactoring(question);
  }
  if (q.includes("simplif")) {
    return solveSimplify(question);
  }
  if (q.includes("quadratic")) {
    return solveQuadratic(question);
  }
  if (q.includes("trigonometr") || q.includes("sin") || q.includes("cos") || q.includes("tan")) {
    return solveTrig(question);
  }

  return solveGeneral(question);
}

function solveEquation(q: string): MathResponse {
  return {
    confidence: 88,
    solution: `**📐 Solving the Equation**

**Step 1: Identify the equation**
Looking at your question: "${q}"

**Step 2: Isolate the variable**
Move all terms with the variable to one side and constants to the other side.

**Step 3: Simplify both sides**
Combine like terms on each side of the equation.

**Step 4: Solve for the variable**
Divide both sides by the coefficient of the variable.

**Step 5: Verify the solution**
Substitute the value back into the original equation to check.

💡 **Tip:** Always remember to perform the same operation on both sides of the equation to maintain equality!

*Please provide the specific equation (e.g., 2x + 5 = 13) for a detailed numerical solution.*`,
  };
}

function solveDerivative(q: string): MathResponse {
  return {
    confidence: 92,
    solution: `**📊 Finding the Derivative**

**Step 1: Identify the function**
Analyzing: "${q}"

**Step 2: Apply differentiation rules**
- **Power Rule:** d/dx [xⁿ] = n·xⁿ⁻¹
- **Product Rule:** d/dx [f·g] = f'·g + f·g'
- **Chain Rule:** d/dx [f(g(x))] = f'(g(x))·g'(x)

**Step 3: Differentiate each term**
Apply the appropriate rule to each term in the function.

**Step 4: Simplify the result**
Combine like terms and simplify the expression.

💡 **Tip:** Remember that the derivative of a constant is always 0!

*Provide the specific function (e.g., f(x) = 3x² + 2x - 5) for a numerical answer.*`,
  };
}

function solveIntegral(q: string): MathResponse {
  return {
    confidence: 85,
    solution: `**∫ Finding the Integral**

**Step 1: Identify the integrand**
Analyzing: "${q}"

**Step 2: Apply integration rules**
- **Power Rule:** ∫xⁿ dx = xⁿ⁺¹/(n+1) + C
- **Substitution:** Use u-substitution for composite functions
- **Integration by Parts:** ∫u dv = uv - ∫v du

**Step 3: Integrate each term**
Apply the reverse of differentiation rules.

**Step 4: Add the constant of integration**
For indefinite integrals, always include + C.

💡 **Tip:** Integration is the reverse of differentiation. Check your answer by differentiating!

*Provide the specific function for a detailed numerical solution.*`,
  };
}

function solveGeometry(q: string): MathResponse {
  return {
    confidence: 90,
    solution: `**📏 Geometry Solution**

**Step 1: Identify the shape and what to find**
Analyzing: "${q}"

**Step 2: Recall relevant formulas**
- **Circle:** Area = πr², Circumference = 2πr
- **Rectangle:** Area = l×w, Perimeter = 2(l+w)
- **Triangle:** Area = ½×b×h
- **Sphere:** Volume = (4/3)πr³, Surface Area = 4πr²

**Step 3: Substitute the given values**
Plug in the known measurements into the formula.

**Step 4: Calculate and simplify**
Perform the arithmetic to get the final answer.

💡 **Tip:** Always include units in your answer!

*Provide specific dimensions for a numerical answer.*`,
  };
}

function solveProbability(q: string): MathResponse {
  return {
    confidence: 87,
    solution: `**🎲 Probability Solution**

**Step 1: Identify the event and sample space**
Analyzing: "${q}"

**Step 2: Determine the approach**
- P(event) = Favorable outcomes / Total outcomes
- For combined events, check if they are independent or dependent

**Step 3: Count outcomes**
List or calculate the number of favorable and total outcomes.

**Step 4: Calculate the probability**
Express as a fraction, decimal, or percentage.

💡 **Tip:** Probability always ranges from 0 to 1 (or 0% to 100%)!

*Provide specific details for a numerical answer.*`,
  };
}

function solveFactoring(q: string): MathResponse {
  return {
    confidence: 91,
    solution: `**🔢 Factoring Solution**

**Step 1: Identify the expression**
Analyzing: "${q}"

**Step 2: Look for common factors**
Factor out the Greatest Common Factor (GCF) first.

**Step 3: Apply factoring techniques**
- **Difference of squares:** a² - b² = (a+b)(a-b)
- **Trinomial:** ax² + bx + c → find factors of ac that sum to b
- **Grouping:** For 4+ terms, group and factor pairs

**Step 4: Verify by expanding**
Multiply the factors back to check your answer.

💡 **Tip:** Always check if you can factor further!

*Provide the specific expression for a detailed solution.*`,
  };
}

function solveSimplify(q: string): MathResponse {
  return {
    confidence: 89,
    solution: `**✨ Simplification**

**Step 1: Identify the expression**
Analyzing: "${q}"

**Step 2: Apply order of operations (BODMAS/PEMDAS)**
Brackets → Orders → Division/Multiplication → Addition/Subtraction

**Step 3: Combine like terms**
Group terms with the same variable and degree.

**Step 4: Reduce fractions**
Simplify any fractions to their lowest terms.

💡 **Tip:** Work systematically from the inside out!

*Provide the specific expression for a numerical answer.*`,
  };
}

function solveQuadratic(q: string): MathResponse {
  return {
    confidence: 93,
    solution: `**📈 Quadratic Equation Solution**

**Step 1: Write in standard form**
ax² + bx + c = 0

**Step 2: Identify a, b, and c**
From: "${q}"

**Step 3: Apply the Quadratic Formula**
x = (-b ± √(b² - 4ac)) / 2a

**Step 4: Calculate the discriminant**
D = b² - 4ac
- D > 0 → Two real solutions
- D = 0 → One real solution
- D < 0 → No real solutions (complex roots)

**Step 5: Find the roots**
Substitute values into the formula and simplify.

💡 **Tip:** You can also try factoring first — it's often faster!

*Provide the specific equation (e.g., x² - 5x + 6 = 0) for a numerical answer.*`,
  };
}

function solveTrig(q: string): MathResponse {
  return {
    confidence: 86,
    solution: `**📐 Trigonometry Solution**

**Step 1: Identify what's given and what to find**
Analyzing: "${q}"

**Step 2: Recall key identities**
- sin²θ + cos²θ = 1
- tan θ = sin θ / cos θ
- sin(A±B) = sinA·cosB ± cosA·sinB

**Step 3: Apply the appropriate formula**
Use SOH-CAH-TOA for right triangles or identities for simplification.

**Step 4: Calculate and verify**
Use known angle values (30°, 45°, 60°, 90°) or a calculator.

💡 **Tip:** Draw a diagram when working with triangles — it helps visualize!

*Provide specific values for a numerical answer.*`,
  };
}

function solveGeneral(q: string): MathResponse {
  return {
    confidence: 80,
    solution: `**🧮 Math Solution**

I'll help you solve this step by step!

**Analyzing your question:**
"${q}"

**Approach:**

**Step 1:** Identify the type of problem and relevant concepts.

**Step 2:** Write down the given information and what needs to be found.

**Step 3:** Choose the appropriate formula or method.

**Step 4:** Solve systematically, showing all work.

**Step 5:** Verify your answer by substituting back or using an alternative method.

💡 **Tip:** For a more detailed solution, try including keywords like "solve," "find," "derivative," "integral," "area," "factor," "quadratic," or "probability" in your question!

*I'm best at: Algebra, Calculus, Geometry, Trigonometry, and Probability!*`,
  };
}

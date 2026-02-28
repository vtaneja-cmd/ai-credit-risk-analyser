// Simulated Random Forest-style credit risk model
// Uses weighted feature contributions to compute Probability of Default

export interface CreditInput {
  annualIncome: number;
  creditUtilization: number;
  latePayments: number;
  loanAmount: number;
  loanTenure: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number; // signed: positive = increases risk, negative = decreases risk
  value: number;
}

export interface CreditResult {
  pd: number;
  riskCategory: "Low" | "Medium" | "High";
  recommendation: "Approve" | "Review" | "Reject";
  accuracy: number;
  rocAuc: number;
  featureImportances: FeatureImportance[];
}

export function predictCreditRisk(input: CreditInput): CreditResult {
  // Normalize features to 0-1 scale
  const incomeNorm = Math.min(input.annualIncome / 2000000, 1); // up to 20L
  const utilNorm = input.creditUtilization / 100;
  const lateNorm = Math.min(input.latePayments / 12, 1);
  const loanRatio = Math.min(input.loanAmount / Math.max(input.annualIncome, 1), 5) / 5;
  const tenureNorm = Math.min(input.loanTenure / 60, 1);

  // Weights (simulating learned Random Forest feature importances)
  const weights = {
    income: -0.25,
    utilization: 0.30,
    latePayments: 0.28,
    loanRatio: 0.12,
    tenure: 0.05,
  };

  // Compute raw contributions
  const contributions = {
    income: weights.income * (1 - incomeNorm),
    utilization: weights.utilization * utilNorm,
    latePayments: weights.latePayments * lateNorm,
    loanRatio: weights.loanRatio * loanRatio,
    tenure: weights.tenure * tenureNorm,
  };

  // Base rate + sum of contributions → sigmoid to get PD
  const baseRate = -1.2;
  const logit = baseRate + Object.values(contributions).reduce((a, b) => a + b, 0) * 5;
  const pd = 1 / (1 + Math.exp(-logit));

  // Risk categorization
  let riskCategory: CreditResult["riskCategory"];
  let recommendation: CreditResult["recommendation"];
  if (pd < 0.10) {
    riskCategory = "Low";
    recommendation = "Approve";
  } else if (pd < 0.25) {
    riskCategory = "Medium";
    recommendation = "Review";
  } else {
    riskCategory = "High";
    recommendation = "Reject";
  }

  // SHAP-like feature importances (sorted by absolute impact)
  const featureImportances: FeatureImportance[] = [
    { feature: "Credit Utilization", importance: contributions.utilization, value: input.creditUtilization },
    { feature: "Late Payments (12m)", importance: contributions.latePayments, value: input.latePayments },
    { feature: "Annual Income", importance: contributions.income, value: input.annualIncome },
    { feature: "Loan-to-Income Ratio", importance: contributions.loanRatio, value: +(input.loanAmount / Math.max(input.annualIncome, 1)).toFixed(2) },
    { feature: "Loan Tenure", importance: contributions.tenure, value: input.loanTenure },
  ].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  return {
    pd,
    riskCategory,
    recommendation,
    accuracy: 0.89,
    rocAuc: 0.93,
    featureImportances,
  };
}

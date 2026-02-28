import { useState } from "react";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { predictCreditRisk, CreditResult } from "@/lib/creditRisk";

const CreditRisk = () => {
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [creditUtilization, setCreditUtilization] = useState(40);
  const [latePayments, setLatePayments] = useState(2);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [loanTenure, setLoanTenure] = useState(24);
  const [result, setResult] = useState<CreditResult | null>(null);

  const handlePredict = () => {
    const r = predictCreditRisk({ annualIncome, creditUtilization, latePayments, loanAmount, loanTenure });
    setResult(r);
  };

  const riskColors = {
    Low: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
    Medium: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
    High: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" },
  };

  const RiskIcon = result?.riskCategory === "Low" ? CheckCircle : result?.riskCategory === "Medium" ? AlertTriangle : XCircle;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d1222]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AI Credit Risk Analyzer</h1>
            <p className="text-xs text-gray-500">Probability of Default · Risk Assessment · SHAP Explainability</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Model Stats */}
        <div className="flex gap-4 text-xs">
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-gray-400">Model:</span> <span className="text-blue-400 font-semibold">Random Forest</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-gray-400">Accuracy:</span> <span className="text-emerald-400 font-semibold">89.0%</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-gray-400">ROC-AUC:</span> <span className="text-cyan-400 font-semibold">0.93</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="bg-[#111827] border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2 text-gray-200">
                <TrendingUp size={18} className="text-blue-400" /> Applicant Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <SliderInput label="Annual Income" value={annualIncome} min={100000} max={2000000} step={50000}
                onChange={setAnnualIncome} format={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <SliderInput label="Credit Utilization" value={creditUtilization} min={0} max={100} step={1}
                onChange={setCreditUtilization} format={(v) => `${v}%`} />
              <SliderInput label="Late Payments (last 12m)" value={latePayments} min={0} max={12} step={1}
                onChange={setLatePayments} format={(v) => `${v}`} />
              <SliderInput label="Loan Amount" value={loanAmount} min={50000} max={2000000} step={50000}
                onChange={setLoanAmount} format={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <SliderInput label="Loan Tenure (months)" value={loanTenure} min={6} max={60} step={6}
                onChange={setLoanTenure} format={(v) => `${v}mo`} />

              <Button onClick={handlePredict}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold h-11 mt-2">
                🔍 Predict Risk
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {!result ? (
              <Card className="bg-[#111827] border-white/10 flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500 text-sm">Adjust inputs and click Predict Risk</p>
              </Card>
            ) : (
              <>
                {/* Risk Summary */}
                <Card className={`bg-[#111827] border ${riskColors[result.riskCategory].border}`}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Probability of Default</p>
                        <p className="text-4xl font-bold mt-1 text-white">{(result.pd * 100).toFixed(1)}%</p>
                      </div>
                      <div className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl ${riskColors[result.riskCategory].bg}`}>
                        <RiskIcon size={28} className={riskColors[result.riskCategory].text} />
                        <span className={`text-sm font-bold ${riskColors[result.riskCategory].text}`}>{result.riskCategory} Risk</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <span className="text-xs text-gray-400">Recommendation:</span>
                      <span className={`text-sm font-bold ${riskColors[result.riskCategory].text}`}>{result.recommendation}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* SHAP Chart */}
                <Card className="bg-[#111827] border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-200">
                      <BarChart3 size={18} className="text-cyan-400" /> Feature Impact (SHAP)
                    </CardTitle>
                    <p className="text-xs text-gray-500">Top features influencing the prediction</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.featureImportances.slice(0, 3).map((f) => {
                      const maxAbs = Math.max(...result.featureImportances.map((x) => Math.abs(x.importance)));
                      const pct = (Math.abs(f.importance) / maxAbs) * 100;
                      const isPositive = f.importance > 0;
                      return (
                        <div key={f.feature} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">{f.feature}</span>
                            <span className={isPositive ? "text-red-400" : "text-emerald-400"}>
                              {isPositive ? "+" : ""}{(f.importance * 100).toFixed(1)}%
                              {isPositive ? " ↑ risk" : " ↓ risk"}
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${isPositive ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-emerald-600 to-emerald-400"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Slider input component
function SliderInput({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white">{format(value)}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step}
        onValueChange={([v]) => onChange(v)}
        className="[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400" />
    </div>
  );
}

export default CreditRisk;

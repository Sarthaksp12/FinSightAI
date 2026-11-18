
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ShieldCheck,
  TrendingDown,
  Gauge,
  BarChart3,
} from "lucide-react";

export default function RiskAnalysis() {
  const metrics = [
    {
      title: "Annualised Volatility",
      description: "Measures how much investment returns fluctuate.",
      icon: Activity,
    },
    {
      title: "Maximum Drawdown",
      description: "Measures the largest historical peak-to-trough decline.",
      icon: TrendingDown,
    },
    {
      title: "Risk Assessment",
      description: "Understand the level of historical investment risk.",
      icon: Gauge,
    },
    {
      title: "Return vs Risk",
      description: "Evaluate historical returns alongside investment risk.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080d18] p-6 text-slate-100 sm:p-10">

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-emerald-400"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      <div className="mt-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <ShieldCheck size={30} />
        </div>

        <h1 className="mt-5 text-3xl font-bold">
          Risk Analysis
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Evaluate investment risk beyond returns. Understand volatility,
          historical losses and risk-adjusted performance.
        </p>
      </div>

      {/* Risk Metrics */}
      <section className="mt-10">
        <h2 className="mb-5 text-xl font-semibold">
          Risk Assessment Metrics
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.title}
                className="rounded-2xl border border-slate-800 bg-[#101a2a] p-6 transition hover:border-emerald-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {metric.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {metric.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* Analysis Information */}
      <section className="mt-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#122c2b] to-[#101827] p-7">

        <div className="flex items-center gap-3 text-emerald-400">
          <Activity size={24} />
          <h2 className="text-xl font-semibold">
            Risk Intelligence Engine
          </h2>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          FinSight AI evaluates historical market data to understand
          investment fluctuations, downside risk and performance
          consistency. Risk metrics will help users make more informed
          comparisons between investment options.
        </p>

      </section>

    </div>
  );
}

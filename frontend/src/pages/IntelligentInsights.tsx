
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

export default function IntelligentInsights() {
  const features = [
    {
      title: "Performance Insights",
      description:
        "Understand historical returns, growth patterns and investment performance.",
      icon: TrendingUp,
    },
    {
      title: "Risk Interpretation",
      description:
        "Understand volatility, maximum drawdown and potential downside risk.",
      icon: ShieldCheck,
    },
    {
      title: "Investment Trends",
      description:
        "Identify historical patterns and changes in investment performance.",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Smart Explanations",
      description:
        "Convert financial metrics into clear and understandable insights.",
      icon: Lightbulb,
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

      {/* Header */}
      <div className="mt-10">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <BrainCircuit size={30} />
        </div>

        <h1 className="mt-5 text-3xl font-bold">
          Intelligent Insights
        </h1>

        <p className="mt-2 max-w-2xl text-slate-400">
          Transform financial data into meaningful insights.
          Understand investment performance, historical trends
          and risk through intelligent analysis.
        </p>

      </div>

      {/* Insight Features */}
      <section className="mt-10">

        <h2 className="mb-5 text-xl font-semibold">
          Intelligence Features
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-[#101a2a] p-6 transition hover:border-emerald-500/30"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* Intelligence Engine */}
      <section className="mt-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#122c2b] to-[#101827] p-7">

        <div className="flex items-center gap-3 text-emerald-400">
          <BrainCircuit size={25} />

          <h2 className="text-xl font-semibold">
            FinSight Intelligence Engine
          </h2>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          Our intelligence layer will interpret financial analysis
          results and generate explanations using historical returns,
          volatility, drawdowns and other investment indicators.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">

          <Link
            to="/stocks"
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#07130f] hover:bg-emerald-300"
          >
            Explore Stock Analysis
          </Link>

          <Link
            to="/mutual-funds"
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Explore Mutual Funds
          </Link>

        </div>

      </section>

    </div>
  );
}

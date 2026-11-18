
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  ArrowLeft,
  Calculator,
  TrendingUp,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [duration, setDuration] = useState(10);

  const [result, setResult] = useState<{
    invested: number;
    returns: number;
    total: number;
  } | null>(null);

  const calculateSIP = () => {
    const months = duration * 12;
    const monthlyRate = annualReturn / 100 / 12;

    // SIP future value formula (payments at month-end)
    const futureValue =
      monthlyRate === 0
        ? monthlyInvestment * months
        : monthlyInvestment *
          ((Math.pow(1 + monthlyRate, months) - 1) /
            monthlyRate);

    const invested = monthlyInvestment * months;
    const returns = futureValue - invested;

    setResult({
      invested,
      returns,
      total: futureValue,
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-[#080d18] p-6 text-slate-100 sm:p-10">

      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      {/* Heading */}
      <div className="mt-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <Wallet size={30} />
        </div>

        <h1 className="mt-5 text-3xl font-bold">
          SIP Calculator
        </h1>

        <p className="mt-2 text-slate-400">
          Calculate your potential investment growth
          with monthly SIP investments.
        </p>
      </div>

      {/* Calculator Layout */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        {/* Input Section */}
        <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-6">

          <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold">
            <Calculator className="text-emerald-400" />
            Investment Details
          </h2>

          {/* Monthly Investment */}
          <div className="mb-7">

            <label className="text-sm text-slate-400">
              Monthly Investment (₹)
            </label>

            <input
              type="number"
              min="1"
              value={monthlyInvestment}
              onChange={(e) =>
                setMonthlyInvestment(Number(e.target.value))
              }
              className="mt-3 w-full rounded-xl border border-slate-700 bg-[#080d18] p-4 text-lg font-semibold text-white outline-none focus:border-emerald-400"
            />

            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) =>
                setMonthlyInvestment(Number(e.target.value))
              }
              className="mt-4 w-full accent-emerald-400"
            />

          </div>

          {/* Expected Return */}
          <div className="mb-7">

            <label className="text-sm text-slate-400">
              Expected Annual Return (%)
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={annualReturn}
              onChange={(e) =>
                setAnnualReturn(Number(e.target.value))
              }
              className="mt-3 w-full rounded-xl border border-slate-700 bg-[#080d18] p-4 text-lg font-semibold text-white outline-none focus:border-emerald-400"
            />

            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualReturn}
              onChange={(e) =>
                setAnnualReturn(Number(e.target.value))
              }
              className="mt-4 w-full accent-emerald-400"
            />

          </div>

          {/* Duration */}
          <div className="mb-8">

            <label className="text-sm text-slate-400">
              Investment Duration (Years)
            </label>

            <input
              type="number"
              min="1"
              max="50"
              value={duration}
              onChange={(e) =>
                setDuration(Number(e.target.value))
              }
              className="mt-3 w-full rounded-xl border border-slate-700 bg-[#080d18] p-4 text-lg font-semibold text-white outline-none focus:border-emerald-400"
            />

            <input
              type="range"
              min="1"
              max="40"
              value={duration}
              onChange={(e) =>
                setDuration(Number(e.target.value))
              }
              className="mt-4 w-full accent-emerald-400"
            />

          </div>

          <button
            onClick={calculateSIP}
            disabled={
              monthlyInvestment <= 0 ||
              annualReturn < 0 ||
              annualReturn > 100 ||
              duration <= 0 ||
              duration > 50 ||
              !Number.isFinite(monthlyInvestment) ||
              !Number.isFinite(annualReturn) ||
              !Number.isFinite(duration)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-4 font-semibold text-[#07130f] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Calculator size={19} />
            Calculate SIP
          </button>

        </div>

        {/* Results Section */}
        <div className="space-y-5">

          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#122c2b] to-[#101827] p-7">

            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp size={20} />
              <span className="text-sm font-medium">
                Estimated Maturity Value
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              {formatCurrency(result?.total ?? 0)}
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              {result
                ? "Based on your selected investment assumptions."
                : "Enter your investment details and calculate."}
            </p>

          </div>

          {/* Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-6">

            <h3 className="mb-6 text-lg font-semibold">
              Investment Breakdown
            </h3>

            <div className="space-y-5">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-400" />
                  <span className="text-sm text-slate-400">
                    Total Invested
                  </span>
                </div>

                <span className="font-semibold">
                  {formatCurrency(result?.invested ?? 0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="text-sm text-slate-400">
                    Estimated Returns
                  </span>
                </div>

                <span className="font-semibold text-emerald-400">
                  {formatCurrency(result?.returns ?? 0)}
                </span>
              </div>

              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Total Value
                  </span>

                  <span className="text-xl font-bold">
                    {formatCurrency(result?.total ?? 0)}
                  </span>
                </div>
              </div>

            </div>

            {/* Investment Progress */}
            {result && (
              <div className="mt-7">

                <div className="mb-3 flex justify-between text-xs text-slate-400">
                  <span>Invested</span>
                  <span>Returns</span>
                </div>

                <div className="flex h-4 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="bg-blue-400"
                    style={{
                      width: `${
                        (result.invested / result.total) * 100
                      }%`,
                    }}
                  />

                  <div
                    className="bg-emerald-400"
                    style={{
                      width: `${
                        (result.returns / result.total) * 100
                      }%`,
                    }}
                  />
                </div>

              </div>
            )}

          </div>

          {/* Investment Summary */}
          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-5">
              <IndianRupee className="mb-3 text-emerald-400" />
              <p className="text-xs text-slate-500">
                Monthly SIP
              </p>
              <p className="mt-1 font-semibold">
                {formatCurrency(monthlyInvestment)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-5">
              <CalendarDays className="mb-3 text-emerald-400" />
              <p className="text-xs text-slate-500">
                Investment Period
              </p>
              <p className="mt-1 font-semibold">
                {duration} Years
              </p>
            </div>

          </div>

        </div>

      </div>

      <p className="mt-10 text-center text-xs text-slate-600">
        Estimates are illustrative and assume a constant monthly
        rate of return. Actual market returns vary. Not investment advice.
      </p>

    </div>
  );
}

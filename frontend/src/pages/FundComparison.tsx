
import { Link } from "react-router-dom";
import { ArrowLeftRight, ArrowLeft } from "lucide-react";

export default function FundComparison() {
  return (
    <div className="min-h-screen bg-[#080d18] p-6 text-slate-100 sm:p-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-emerald-400">
        <ArrowLeft size={17} /> Back to Dashboard
      </Link>

      <div className="mt-10">
        <ArrowLeftRight size={35} className="text-emerald-400" />
        <h1 className="mt-5 text-3xl font-bold">Fund Comparison</h1>
        <p className="mt-2 text-slate-400">
          Compare mutual funds by returns, volatility and drawdowns.
        </p>
      </div>
    </div>
  );
}

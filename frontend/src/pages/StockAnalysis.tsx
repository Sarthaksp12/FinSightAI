

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowLeft,
  Search,
  Loader2,
  AlertCircle,
} from "lucide-react";

// @ts-ignore: api.js is a shared JavaScript Axios instance without a local declaration file.
import api from "../Api/api";

export default function StockAnalysis() {
  const [symbol, setSymbol] = useState("RELIANCE.NS");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStockAnalysis = async () => {
    if (!symbol.trim()) {
      setError("Please enter a stock symbol.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const response = await api.get(
        `/market/analysis/${encodeURIComponent(symbol.trim())}`
      );

      setData(response.data);
    } catch (err: any) {
      console.error("Stock API Error:", err);

      setError(
        err.response?.data?.detail ||
        err.message ||
        "Unable to fetch stock analysis."
      );
    } finally {
      setLoading(false);
    }
  };

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
        <TrendingUp size={35} className="text-emerald-400" />

        <h1 className="mt-5 text-3xl font-bold">
          Stock Analysis
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze historical stock performance and market risk.
        </p>
      </div>

      {/* Search Section */}
      <div className="mt-10 max-w-2xl rounded-2xl border border-slate-800 bg-[#101a2a] p-6">

        <label className="text-sm text-slate-300">
          Enter Stock Symbol
        </label>

        <div className="mt-3 flex gap-3">

          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchStockAnalysis();
            }}
            placeholder="RELIANCE.NS"
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#080d18] px-4 py-3 text-white outline-none focus:border-emerald-400"
          />

          <button
            onClick={fetchStockAnalysis}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={19} className="animate-spin" />
            ) : (
              <Search size={19} />
            )}

            {loading ? "Loading" : "Analyze"}
          </button>

        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* API Response */}
      {data && (
        <div className="mt-8 max-w-4xl rounded-2xl border border-emerald-500/20 bg-[#101a2a] p-6">

          <h2 className="mb-4 text-xl font-semibold text-emerald-400">
            Stock Analysis Results
          </h2>

          <p className="mb-4 text-sm text-slate-400">
            API response received successfully.
          </p>

          <pre className="overflow-x-auto rounded-xl bg-[#080d18] p-5 text-sm leading-6 text-emerald-300">
            {JSON.stringify(data, null, 2)}
          </pre>

        </div>
      )}

    </div>
  );
}

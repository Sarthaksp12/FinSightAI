
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  ArrowLeftRight,
  Wallet,
  Activity,
  ArrowUpRight,
  Bell,
  ShieldCheck,
  BrainCircuit,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Stock Analysis", icon: TrendingUp, href: "/stocks" },
  { name: "Mutual Funds", icon: PieChart, href: "/mutual-funds" },
  { name: "SIP Calculator", icon: Wallet, href: "/sip" },
  { name: "Fund Comparison", icon: ArrowLeftRight, href: "/comparison" },
];

const tools = [
  {
    id: "stocks",
    title: "Stock Analysis",
    description:
      "Explore historical stock prices, returns, volatility and drawdowns.",
    icon: TrendingUp,
    tag: "MARKET INTELLIGENCE",
    path: "/stocks",
  },
  {
    id: "funds",
    title: "Mutual Fund Explorer",
    description:
      "Search mutual funds and understand their historical performance.",
    icon: PieChart,
    tag: "FUND RESEARCH",
    path: "/mutual-funds",
  },
  {
    id: "sip",
    title: "Historical SIP Calculator",
    description:
      "Calculate how your monthly investments would have performed.",
    icon: Wallet,
    tag: "INVESTMENT PLANNING",
    path: "/sip",
  },
  {
    id: "comparison",
    title: "Fund Comparison",
    description:
      "Compare historical returns, risk and drawdowns across funds.",
    icon: ArrowLeftRight,
    tag: "SMART COMPARISON",
    path: "/comparison",
  },
];

const overviewCards = [
  {
    title: "Stock Intelligence",
    subtitle: "Historical stock analysis",
    icon: TrendingUp,
    path: "/stocks",
  },
  {
    title: "Mutual Funds",
    subtitle: "Fund performance insights",
    icon: PieChart,
    path: "/mutual-funds",
  },
  {
    title: "SIP Planning",
    subtitle: "Historical investment returns",
    icon: Wallet,
    path: "/sip",
  },
  {
    title: "Risk Analysis",
    subtitle: "Volatility and drawdown",
    icon: Activity,
    path: "/stocks",
  },
];

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-800/80 bg-[#0b1220] p-6 lg:flex">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            FinSight <span className="text-emerald-400">AI</span>
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Financial Intelligence Platform
          </p>
        </div>

        <p className="mb-3 mt-12 text-xs font-semibold uppercase tracking-widest text-slate-600">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  index === 0
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck size={18} />
            <span className="text-sm font-semibold">
              FinSight Intelligence
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Data-driven financial analysis powered by historical market data.
          </p>

        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-[#0b1220]/95 p-4 backdrop-blur lg:hidden">

        <div className="flex items-center justify-between">

          <h1 className="text-xl font-bold">
            FinSight <span className="text-emerald-400">AI</span>
          </h1>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>

        {menuOpen && (
          <nav className="mt-4 space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800"
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}

          </nav>
        )}

      </div>

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">

        {/* Header */}
        <header className="sticky top-0 z-20 hidden items-center justify-between border-b border-slate-800/80 bg-[#080d18]/90 px-10 py-5 backdrop-blur lg:flex">

          <div>
            <p className="text-sm text-slate-500">
              Workspace / Overview
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4">

            <button className="rounded-xl border border-slate-800 p-2.5 text-slate-400 hover:text-white">
              <Bell size={18} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-400">
              S
            </div>

          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          {/* Hero */}
          <section
            id="overview"
            className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#122c2b] via-[#10202b] to-[#101827] p-7 sm:p-10"
          >

            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <BrainCircuit size={14} />
                FINANCIAL INTELLIGENCE
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Understand your investments.
                <span className="block text-emerald-400">
                  Make informed decisions.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Analyze stock performance, explore mutual funds, calculate historical
                SIP returns and compare investment risk with FinSight AI.
              </p>

              <a
                href="#tools"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#07130f] transition hover:bg-emerald-300"
              >
                Explore platform <ArrowUpRight size={17} />
              </a>

            </div>
          </section>

          {/* Overview Cards */}
          <section>

            <div className="mb-5">

              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Platform overview
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Your financial workspace
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Everything you need to analyze investments in one place.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {overviewCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    to={item.path}
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-[#101a2a] p-5 transition hover:-translate-y-1 hover:border-emerald-500/30"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-5 font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {item.subtitle}
                    </p>

                  </Link>
                );
              })}

            </div>
          </section>

          {/* Investment Tools */}
          <section id="tools" className="scroll-mt-24">

            <div className="mb-6">

              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Investment tools
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a tool to start your financial analysis.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {tools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <Link
                    to={tool.path}
                    key={tool.id}
                    className="group rounded-2xl border border-slate-800 bg-[#101a2a] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#142235]"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                        <Icon size={23} />
                      </div>

                      <ArrowUpRight className="text-slate-600 transition group-hover:text-emerald-400" />

                    </div>

                    <p className="mt-6 text-[10px] font-bold tracking-widest text-emerald-400">
                      {tool.tag}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {tool.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-400">
                      Explore tool <ChevronRight size={16} />
                    </div>

                  </Link>
                );
              })}

            </div>
          </section>

          {/* Feature Section */}
          <section className="grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-7">

              <Activity className="text-emerald-400" size={25} />

              <h3 className="mt-5 text-lg font-semibold">
                Risk-aware analysis
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Understand volatility, historical drawdowns and returns rather
                than looking at returns alone.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#101a2a] p-7">

              <BrainCircuit className="text-emerald-400" size={25} />

              <h3 className="mt-5 text-lg font-semibold">
                Intelligent insights
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Bring investment data and analytical calculations together
                to make performance easier to understand.
              </p>

            </div>

          </section>

          {/* Footer */}
          <footer className="border-t border-slate-800 py-7 text-center">

            <p className="text-sm font-semibold text-slate-400">
              FinSight <span className="text-emerald-400">AI</span>
            </p>

            <p className="mt-2 text-xs text-slate-600">
              Financial analytics and educational insights. Not investment advice.
            </p>

          </footer>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;

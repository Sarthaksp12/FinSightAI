import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StockAnalysis from "./pages/StockAnalysis";
import MutualFunds from "./pages/MutualFunds";
import SipCalculator  from "./pages/SipCalculator";
import FundComparison from "./pages/FundComparison";
import RiskAnalysis from "./pages/RiskAnalysis";
import IntelligentInsights from "./pages/IntelligentInsights";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/stocks" element={<StockAnalysis />} />
      <Route path="/mutual-funds" element={<MutualFunds />} />
      <Route path="/sip" element={<SipCalculator />} />
      <Route path="/comparison" element={<FundComparison />} />
      <Route path="/risk-analysis" element={<RiskAnalysis />} />

<Route path="/intelligent-insights" element={<IntelligentInsights />} />
    </Routes>
  );
}

export default App;
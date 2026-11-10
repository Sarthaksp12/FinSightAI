
import yfinance as yf


def fetch_stock_history(symbol: str, period: str = "1y"):
    """
    Fetch historical stock market data from Yahoo Finance.
    Indian NSE stocks generally use the .NS suffix.
    """

    # Convert RELIANCE to RELIANCE.NS
    if not symbol.endswith((".NS", ".BO")):
        symbol = f"{symbol}.NS"

    stock = yf.Ticker(symbol)

    history = stock.history(period=period)

    if history.empty:
        return {
            "error": f"No historical data found for {symbol}"
        }

    history = history.reset_index()

    records = []

    for _, row in history.iterrows():
        records.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "open": round(float(row["Open"]), 2),
            "high": round(float(row["High"]), 2),
            "low": round(float(row["Low"]), 2),
            "close": round(float(row["Close"]), 2),
            "volume": int(row["Volume"])
        })

    return {
        "symbol": symbol,
        "period": period,
        "records_count": len(records),
        "history": records
    }

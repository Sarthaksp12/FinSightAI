
import pandas as pd


def analyze_stock(prices):

    prices = pd.Series(prices, dtype="float64").dropna()

    if len(prices) < 2:
        raise ValueError("At least two closing prices are required.")

    if (prices <= 0).any():
        raise ValueError("Prices must be positive.")

    daily_returns = prices.pct_change().dropna()

    first_price = prices.iloc[0]
    last_price = prices.iloc[-1]

    total_return = (last_price / first_price) - 1

    years = (
        prices.index[-1] - prices.index[0]
    ).days / 365.25

    cagr = (
        (last_price / first_price) ** (1 / years) - 1
        if years > 0 else None
    )

    volatility = daily_returns.std() * (252 ** 0.5)

    running_peak = prices.cummax()
    drawdowns = (prices / running_peak) - 1

    max_drawdown = drawdowns.min()

    return {
        "first_price": round(float(first_price), 2),
        "latest_price": round(float(last_price), 2),
        "total_return_percentage": round(float(total_return * 100), 2),
        "cagr_percentage": round(float(cagr * 100), 2) if cagr is not None else None,
        "annualized_volatility_percentage": round(float(volatility * 100), 2),
        "maximum_drawdown_percentage": round(float(max_drawdown * 100), 2)
    }

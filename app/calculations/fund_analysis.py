
import pandas as pd
import numpy as np


def analyze_mutual_fund(nav_history):

    df = pd.DataFrame(nav_history)

    if df.empty or not {"date", "nav"}.issubset(df.columns):
        raise ValueError("Valid NAV history is required.")

    # Convert and clean data
    df["date"] = pd.to_datetime(
        df["date"],
        dayfirst=True,
        errors="coerce"
    )

    df["nav"] = pd.to_numeric(
        df["nav"],
        errors="coerce"
    )

    df = df.dropna(subset=["date", "nav"])
    df = df[df["nav"] > 0]

    # Remove duplicate dates and sort chronologically
    df = (
        df.sort_values("date")
        .drop_duplicates(subset=["date"], keep="last")
        .reset_index(drop=True)
    )

    if len(df) < 2:
        raise ValueError("Insufficient valid NAV records.")

    prices = df.set_index("date")["nav"]

    first_nav = float(prices.iloc[0])
    latest_nav = float(prices.iloc[-1])

    # Actual period
    days = (prices.index[-1] - prices.index[0]).days
    years = days / 365.25

    if years <= 0:
        raise ValueError("Invalid NAV date range.")

    # 1. Total return
    total_return = (
        (latest_nav / first_nav) - 1
    ) * 100

    # 2. CAGR
    cagr = (
        ((latest_nav / first_nav) ** (1 / years)) - 1
    ) * 100

    # 3. Daily NAV returns
    daily_returns = prices.pct_change().dropna()

    # 4. Annualized volatility
    volatility = (
        daily_returns.std() * np.sqrt(252) * 100
        if len(daily_returns) > 1
        else None
    )

    # 5. Maximum drawdown
    running_peak = prices.cummax()

    drawdowns = (
        (prices / running_peak) - 1
    ) * 100

    max_drawdown = drawdowns.min()

    return {
        "first_nav_date": prices.index[0].strftime("%Y-%m-%d"),
        "latest_nav_date": prices.index[-1].strftime("%Y-%m-%d"),
        "first_nav": round(first_nav, 4),
        "latest_nav": round(latest_nav, 4),
        "period_years": round(years, 2),
        "total_return_percentage": round(float(total_return), 2),
        "cagr_percentage": round(float(cagr), 2),
        "volatility_percentage": (
            round(float(volatility), 2)
            if volatility is not None else None
        ),
        "maximum_drawdown_percentage": round(float(max_drawdown), 2),
        "records_analyzed": len(df)
    }

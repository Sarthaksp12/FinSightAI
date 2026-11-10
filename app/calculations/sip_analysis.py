
import pandas as pd


def calculate_xirr(cashflows, dates):

    if len(cashflows) < 2:
        return None

    start_date = dates[0]

    def npv(rate):
        return sum(
            amount / (
                (1 + rate) **
                ((date - start_date).days / 365.0)
            )
            for amount, date in zip(cashflows, dates)
        )

    low = -0.9999
    high = 10.0

    low_value = npv(low)
    high_value = npv(high)

    # Expand the upper limit if necessary
    while low_value * high_value > 0 and high < 1000:
        high *= 2
        high_value = npv(high)

    if low_value * high_value > 0:
        return None

    for _ in range(200):
        mid = (low + high) / 2
        value = npv(mid)

        if abs(value) < 0.000001:
            return round(mid * 100, 2)

        if value > 0:
            low = mid
        else:
            high = mid

    return round(((low + high) / 2) * 100, 2)


def calculate_historical_sip(
    monthly_investment,
    nav_history,
    sip_day=1,
    start_date=None,
    end_date=None
):

    if monthly_investment <= 0:
        raise ValueError("Investment must be greater than zero.")

    if not 1 <= sip_day <= 28:
        raise ValueError("SIP day must be between 1 and 28.")

    df = pd.DataFrame(nav_history)

    if df.empty or not {"date", "nav"}.issubset(df.columns):
        raise ValueError("Valid NAV history is required.")

    df["date"] = pd.to_datetime(
        df["date"], dayfirst=True, errors="coerce"
    )
    df["nav"] = pd.to_numeric(df["nav"], errors="coerce")

    df = df.dropna(subset=["date", "nav"])
    df = df[df["nav"] > 0]

    df = (
        df.sort_values("date")
        .drop_duplicates(subset=["date"], keep="last")
        .reset_index(drop=True)
    )

    if df.empty:
        raise ValueError("No valid NAV records found.")

    # Use the requested investment period
    start = (
        pd.to_datetime(start_date)
        if start_date else df["date"].iloc[0]
    )

    end = (
        pd.to_datetime(end_date)
        if end_date else df["date"].iloc[-1]
    )

    if start >= end:
        raise ValueError("End date must be after start date.")

    if start < df["date"].iloc[0] or end > df["date"].iloc[-1]:
        raise ValueError("Selected period is outside available NAV history.")

    period_df = df[
        (df["date"] >= start) &
        (df["date"] <= end)
    ].copy()

    if period_df.empty:
        raise ValueError("No NAV records found in selected period.")

    total_invested = 0.0
    total_units = 0.0

    investment_records = []
    cashflows = []
    cashflow_dates = []

    first_month = start.to_period("M")
    last_month = end.to_period("M")

    for month in pd.period_range(
        first_month, last_month, freq="M"
    ):

        sip_date = pd.Timestamp(
            year=month.year,
            month=month.month,
            day=sip_day
        )

        if sip_date < start:
            sip_date = start

        if sip_date > end:
            continue

        available_nav = period_df[
            (period_df["date"] >= sip_date) &
            (period_df["date"] <= end)
        ]

        # First available NAV on or after SIP date
        if available_nav.empty:
            continue

        nav_record = available_nav.iloc[0]

        nav = float(nav_record["nav"])
        investment_date = nav_record["date"]

        units = monthly_investment / nav

        total_invested += monthly_investment
        total_units += units

        cashflows.append(-monthly_investment)
        cashflow_dates.append(investment_date)

        investment_records.append({
            "investment_date": investment_date.strftime("%Y-%m-%d"),
            "nav": round(nav, 4),
            "investment": round(monthly_investment, 2),
            "units_purchased": round(units, 4)
        })

    if not investment_records:
        raise ValueError("No SIP investment dates found.")

    latest_record = period_df.iloc[-1]

    latest_nav = float(latest_record["nav"])
    valuation_date = latest_record["date"]

    current_value = total_units * latest_nav
    profit_loss = current_value - total_invested

    cashflows.append(current_value)
    cashflow_dates.append(valuation_date)

    xirr = calculate_xirr(cashflows, cashflow_dates)

    return {
        "investment_period": {
            "start_date": start.strftime("%Y-%m-%d"),
            "end_date": end.strftime("%Y-%m-%d")
        },
        "monthly_investment": round(monthly_investment, 2),
        "number_of_installments": len(investment_records),
        "total_invested": round(total_invested, 2),
        "total_units": round(total_units, 4),
        "latest_nav": round(latest_nav, 4),
        "valuation_date": valuation_date.strftime("%Y-%m-%d"),
        "current_value": round(current_value, 2),
        "profit_loss": round(profit_loss, 2),
        "absolute_return_percentage": round(
            (profit_loss / total_invested) * 100, 2
        ),
        "xirr_percentage": xirr,
        "investment_records": investment_records
    }

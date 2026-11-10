def calculate_stock_return(quantity, buy_price, current_price):
    invested_amount = quantity * buy_price
    current_value = quantity * current_price

    profit_loss = current_value - invested_amount

    return_percentage = (
        (profit_loss / invested_amount) * 100
        if invested_amount > 0 else 0
    )

    return {
        "invested_amount": round(invested_amount, 2),
        "current_value": round(current_value, 2),
        "profit_loss": round(profit_loss, 2),
        "return_percentage": round(return_percentage, 2)
    }


def calculate_lumpsum(principal, annual_rate, years):
    future_value = principal * (1 + annual_rate / 100) ** years

    return {
        "invested_amount": round(principal, 2),
        "future_value": round(future_value, 2),
        "estimated_profit": round(future_value - principal, 2)
    }


def calculate_sip(monthly_investment, annual_rate, years):
    monthly_rate = annual_rate / 100 / 12
    total_months = years * 12

    if monthly_rate == 0:
        future_value = monthly_investment * total_months
    else:
        future_value = monthly_investment * (
            ((1 + monthly_rate) ** total_months - 1)
            / monthly_rate
        ) * (1 + monthly_rate)

    invested_amount = monthly_investment * total_months

    return {
        "invested_amount": round(invested_amount, 2),
        "future_value": round(future_value, 2),
        "estimated_profit": round(future_value - invested_amount, 2)
    }
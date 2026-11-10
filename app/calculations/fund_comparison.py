
def compare_mutual_funds(funds):

    if len(funds) < 2:
        raise ValueError("Select at least two funds to compare.")

    # Ensure the funds belong to the same category
    categories = {
        fund.get("category")
        for fund in funds
    }

    if None in categories or len(categories) != 1:
        raise ValueError(
            "Only funds from the same category can be compared."
        )

    results = []

    for fund in funds:
        analysis = fund["analysis"]

        results.append({
            "fund_name": fund["fund_name"],
            "scheme_code": fund["scheme_code"],
            "cagr_percentage": analysis["cagr_percentage"],
            "total_return_percentage": analysis["total_return_percentage"],
            "volatility_percentage": analysis["volatility_percentage"],
            "maximum_drawdown_percentage": analysis["maximum_drawdown_percentage"]
        })

    # Highest CAGR first
    results.sort(
        key=lambda x: x["cagr_percentage"],
        reverse=True
    )

    for index, fund in enumerate(results):
        fund["historical_cagr_rank"] = index + 1

    return {
        "category": list(categories)[0],
        "comparison_count": len(results),
        "comparison": results,
        "best_historical_performer": results[0]["fund_name"],
        "ranking_basis": "Historical CAGR"
    }

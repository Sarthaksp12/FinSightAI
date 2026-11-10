
def rate_mutual_fund(
    fund_cagr,
    benchmark_cagr=None,
    volatility=None,
    max_drawdown=None
):
    # Never give a comparative rating without a benchmark
    if benchmark_cagr is None:
        return {
            "performance_rating": "Insufficient Data",
            "performance_summary": (
                "Historical metrics are available, but benchmark "
                "comparison is required to determine performance."
            ),
            "reasons": [
                "Benchmark comparison is not available yet."
            ]
        }

    reasons = []

    difference = fund_cagr - benchmark_cagr

    if difference >= 2:
        reasons.append("Outperformed its benchmark.")
    elif difference <= -2:
        reasons.append("Underperformed its benchmark.")
    else:
        reasons.append("Performance was broadly in line with its benchmark.")

    if volatility is not None:
        if volatility > 30:
            reasons.append("Experienced high historical volatility.")
        elif volatility < 15:
            reasons.append("Experienced relatively low volatility.")
        else:
            reasons.append("Experienced moderate historical volatility.")

    if max_drawdown is not None:
        if max_drawdown <= -40:
            reasons.append("Experienced substantial historical drawdown.")
        elif max_drawdown <= -20:
            reasons.append("Experienced notable historical drawdown.")
        else:
            reasons.append("Had comparatively limited historical drawdown.")

    if difference >= 2 and (
        volatility is None or volatility <= 30
    ) and (
        max_drawdown is None or max_drawdown > -40
    ):
        rating = "Good Performing"

    elif difference <= -2:
        rating = "Underperforming"

    else:
        rating = "Average Performing"

    return {
        "performance_rating": rating,
        "performance_summary": (
            f"The fund delivered a CAGR of {fund_cagr}% "
            f"against its benchmark's {benchmark_cagr}%."
        ),
        "benchmark_difference_percentage": round(difference, 2),
        "reasons": reasons
    }

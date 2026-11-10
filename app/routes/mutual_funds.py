
import pandas as pd

from fastapi import APIRouter, HTTPException, Query

from app.calculations.sip_analysis import calculate_historical_sip
from app.calculations.fund_analysis import analyze_mutual_fund

from app.services.mutual_fund_data import (
    search_mutual_fund,
    fetch_mutual_fund_nav
)

router = APIRouter(
    prefix="/mutual-funds",
    tags=["Mutual Funds"]
)


# Generate preliminary performance assessment
def generate_fund_assessment(analysis):

    cagr = analysis["cagr_percentage"]
    volatility = analysis["volatility_percentage"]
    drawdown = analysis["maximum_drawdown_percentage"]

    if volatility is None:
        return {
            "performance_rating": "Insufficient Data",
            "performance_summary": "Insufficient data to assess fund risk.",
            "reasons": ["Volatility data is unavailable."]
        }

    if cagr >= 15 and drawdown > -35:
        rating = "Good Performing"
        summary = (
            "The fund has delivered strong historical growth "
            "with comparatively controlled downside."
        )

    elif cagr >= 8 and drawdown > -45:
        rating = "Average Performing"
        summary = (
            "The fund has delivered moderate historical growth "
            "with some downside risk."
        )

    else:
        rating = "Underperforming"
        summary = (
            "Historical growth or downside risk indicates "
            "weaker performance."
        )

    return {
        "performance_rating": rating,
        "performance_summary": summary,
        "reasons": [
            f"Historical CAGR: {cagr}%",
            f"Annualized volatility: {volatility}%",
            f"Maximum drawdown: {drawdown}%"
        ],
        "rating_type": "Preliminary, not benchmark-adjusted"
    }


# Search mutual funds with statistics and rating
@router.get("/search")
def search_funds(q: str = Query(..., min_length=2)):

    try:
        funds = search_mutual_fund(q)[:5]

        if not funds:
            raise HTTPException(
                status_code=404,
                detail="No mutual funds found."
            )

        results = []

        for fund in funds:

            scheme_code = fund["schemeCode"]

            try:
                nav_data = fetch_mutual_fund_nav(scheme_code)

                analysis = analyze_mutual_fund(
                    nav_data["history"]
                )

                latest_date = pd.to_datetime(
                    analysis["latest_nav_date"]
                )

                age_days = (
                    pd.Timestamp.now().normalize() -
                    latest_date.normalize()
                ).days

                if age_days > 30:
                    assessment = {
                        "performance_rating": "Insufficient Data",
                        "performance_summary": (
                            "NAV data is outdated. "
                            "A current performance assessment "
                            "cannot be provided."
                        ),
                        "reasons": [
                            f"Latest NAV is {age_days} days old."
                        ]
                    }

                else:
                    assessment = generate_fund_assessment(
                        analysis
                    )

                results.append({
                    "fund_name": fund["schemeName"],
                    "scheme_code": scheme_code,
                    "analysis": analysis,
                    "assessment": assessment
                })

            except Exception as fund_error:

                results.append({
                    "fund_name": fund.get("schemeName", "Unknown"),
                    "scheme_code": scheme_code,
                    "error": str(fund_error),
                    "assessment": {
                        "performance_rating": "Insufficient Data",
                        "performance_summary": (
                            "Unable to analyze this fund."
                        )
                    }
                })

        return {
            "search_query": q,
            "total_funds": len(results),
            "funds": results
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# Fetch historical NAV
@router.get("/nav/{scheme_code}")
def get_fund_nav(scheme_code: int):

    try:
        return fetch_mutual_fund_nav(scheme_code)

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )


# Historical SIP calculation

from datetime import date

@router.post("/sip/{scheme_code}")
def calculate_fund_sip(
    scheme_code: int,
    monthly_investment: float = Query(gt=0),
    sip_day: int = Query(default=1, ge=1, le=28),
    start_date: date = Query(...),
    end_date: date = Query(...)
):

    try:
        fund_data = fetch_mutual_fund_nav(scheme_code)

        result = calculate_historical_sip(
            monthly_investment=monthly_investment,
            nav_history=fund_data["history"],
            sip_day=sip_day,
            start_date=start_date,
            end_date=end_date
        )

        return {
            "scheme_code": scheme_code,
            "scheme_name": fund_data["scheme_name"],
            "sip_analysis": result
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

# Analyze an individual fund
@router.get("/analysis/{scheme_code}")
def analyze_fund(scheme_code: int):

    try:
        fund_data = fetch_mutual_fund_nav(scheme_code)

        analysis = analyze_mutual_fund(
            fund_data["history"]
        )

        assessment = generate_fund_assessment(analysis)

        return {
            "scheme_code": scheme_code,
            "scheme_name": fund_data["scheme_name"],
            "analysis": analysis,
            "assessment": assessment
        }

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )


# Search and analyze the first matching fund
@router.get("/analyze")
def analyze_fund_by_name(
    q: str = Query(..., min_length=2)
):

    try:
        funds = search_mutual_fund(q)

        if not funds:
            raise HTTPException(
                status_code=404,
                detail="No mutual funds found."
            )

        selected_fund = funds[0]

        scheme_code = selected_fund["schemeCode"]

        fund_data = fetch_mutual_fund_nav(scheme_code)

        analysis = analyze_mutual_fund(
            fund_data["history"]
        )

        assessment = generate_fund_assessment(analysis)

        return {
            "fund_name": fund_data["scheme_name"],
            "scheme_code": scheme_code,
            "analysis": analysis,
            "assessment": assessment
        }

    except HTTPException:
        raise

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )

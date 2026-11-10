
from fastapi import APIRouter, HTTPException
import pandas as pd

from app.calculations.stock_analysis import analyze_stock
from app.services.market_data import fetch_stock_history

router = APIRouter(
    prefix="/market",
    tags=["Market Data"]
)


# Fetch historical stock prices
@router.get("/history/{symbol}")
def get_stock_history(symbol: str, period: str = "1y"):
    try:
        return fetch_stock_history(symbol, period)

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


# Analyze historical stock performance
@router.get("/analysis/{symbol}")
def get_stock_analysis(symbol: str, period: str = "1y"):
    try:
        result = fetch_stock_history(symbol, period)

        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])

        history = result["history"]

        prices = pd.Series(
            [item["close"] for item in history],
            index=pd.to_datetime([item["date"] for item in history])
        )

        analysis = analyze_stock(prices)

        return {
            "symbol": result["symbol"],
            "period": period,
            "analysis": analysis
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

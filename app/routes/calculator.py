
from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.calculations.returns import (
    calculate_stock_return,
    calculate_lumpsum,
    calculate_sip
)

router = APIRouter(prefix="/calculator", tags=["Investment Calculator"])


class StockRequest(BaseModel):
    quantity: int = Field(gt=0)
    buy_price: float = Field(gt=0)
    current_price: float = Field(gt=0)


class LumpSumRequest(BaseModel):
    principal: float = Field(gt=0)
    annual_rate: float = Field(ge=0, le=100)
    years: int = Field(gt=0, le=100)


class SIPRequest(BaseModel):
    monthly_investment: float = Field(gt=0)
    annual_rate: float = Field(ge=0, le=100)
    years: int = Field(gt=0, le=100)


@router.post("/stock")
def stock_calculator(data: StockRequest):
    return calculate_stock_return(
        data.quantity,
        data.buy_price,
        data.current_price
    )


@router.post("/lumpsum")
def lumpsum_calculator(data: LumpSumRequest):
    return calculate_lumpsum(
        data.principal,
        data.annual_rate,
        data.years
    )


@router.post("/sip")
def sip_calculator(data: SIPRequest):
    return calculate_sip(
        data.monthly_investment,
        data.annual_rate,
        data.years
    )

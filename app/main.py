
from fastapi import FastAPI

# Import API routers
from app.routes.calculator import router as calculator_router
from app.routes.market import router as market_router
from app.routes.mutual_funds import router as mutual_funds_router




# Initialize FastAPI application
app = FastAPI(
    title="FinSight AI",
    description="Financial Intelligence and Risk Analysis Engine",
    version="1.0.0"
)


# Register API routers
app.include_router(calculator_router)
app.include_router(market_router)
app.include_router(mutual_funds_router)


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "Welcome to FinSight AI",
        "status": "Running"
    }


# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


import requests

BASE_URL = "https://api.mfapi.in/mf"


def search_mutual_fund(query: str):
    """
    Search for mutual funds by scheme name.
    Returns matching scheme names and scheme codes.
    """

    if not query or len(query.strip()) < 2:
        raise ValueError("Search query must contain at least 2 characters.")

    url = f"{BASE_URL}/search"

    try:
        response = requests.get(
            url,
            params={"q": query.strip()},
            timeout=15
        )

        response.raise_for_status()

        funds = response.json()

        if not isinstance(funds, list):
            raise ValueError("Invalid mutual fund search response.")

        return funds[:10]

    except requests.RequestException as error:
        raise ValueError(
            f"Mutual fund search failed: {error}"
        )


def fetch_mutual_fund_nav(scheme_code: int):
    """
    Fetch historical NAV and scheme metadata.
    """

    if scheme_code <= 0:
        raise ValueError("Invalid mutual fund scheme code.")

    url = f"{BASE_URL}/{scheme_code}"

    try:
        response = requests.get(
            url,
            timeout=15
        )

        response.raise_for_status()

        result = response.json()

        metadata = result.get("meta") or {}
        nav_records = result.get("data") or []

        if not metadata or not nav_records:
            raise ValueError(
                "No scheme metadata or NAV history found."
            )

        history = []

        for record in nav_records:

            try:
                nav = float(record["nav"])

                if nav <= 0:
                    continue

                history.append({
                    "date": record["date"],
                    "nav": nav
                })

            except (KeyError, TypeError, ValueError):
                continue

        if not history:
            raise ValueError("No valid NAV records found.")

        return {
            "scheme_code": scheme_code,
            "scheme_name": metadata.get("scheme_name"),
            "scheme_category": metadata.get("scheme_category"),
            "fund_house": metadata.get("fund_house"),
            "records_count": len(history),
            "history": history
        }

    except requests.RequestException as error:
        raise ValueError(
            f"Unable to fetch NAV data: {error}"
        )

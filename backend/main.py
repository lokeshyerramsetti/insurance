from fastapi import FastAPI, Depends, Query
from database import SessionLocal, engine, Base
from sqlalchemy.orm import Session
from typing import Optional
from models import InsurancePolicy
from schemas import PagainationPolicyResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="insurance policy api")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = False,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.close()

def add_data(db:Session):
    print(db.query(InsurancePolicy).count())
    if db.query(InsurancePolicy).count() == 0:
        import json
        print("hitt")
        with open("sample_data.json") as f:
            data = json.load(f)
            for item in data:
                db.add(InsurancePolicy(**item))
            db.commit()
    
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        add_data(db)
    finally:
        db.close()


@app.get("/policies", response_model=PagainationPolicyResponse)
def get_policies(db:Session = Depends(get_db),
                name:Optional[str] = Query(None,alias="name"),
                policy_type:Optional[str] = Query(None,alias="policyType"),
                min_premium:Optional[str] = Query(None,alias="minPremium"),
                max_premium:Optional[str] = Query(None,alias="maxPremimum"),
                min_coverage:Optional[str] = Query(None,alias="minCoverage"),
                sort_by_premium:Optional[str] = Query(None,alias="sort"),
                limit: int = 10,
                page: int = 1     
                 ):
    
    offset  = (page - 1) * limit

    query = db.query(InsurancePolicy)
    
    if name:
        query = query.filter(InsurancePolicy.name.ilike(f"%{name}"))
    if policy_type:
        query = query.filter(InsurancePolicy.policy_type == policy_type)
    
    try:
        if min_premium and min_premium.strip() != "":
            query = query.filter(InsurancePolicy.premium >= float(min_premium))
    except ValueError:
        pass

    try:
        if max_premium and max_premium.strip() != "":
            query = query.filter(InsurancePolicy.premium <= float(max_premium))
    except ValueError:
        pass

    try:
        if min_coverage and min_coverage.strip() != "":
            query = query.filter(InsurancePolicy.premium <= float(min_coverage))
    except ValueError:
        pass

    if sort_by_premium == "asc":
        query = query.order_by(InsurancePolicy.premium.asc())
    elif sort_by_premium == "desc":
        query = query.order_by(InsurancePolicy.premium.desc())

    total_items = query.count()
    total_pages = (total_items + limit -1) // limit
    policies_list = query.offset(offset).limit(limit).all()

    return {
        "total_items":query.count(),
        "total_pages":total_pages,
        "results":policies_list
    }
            


from sqlalchemy import Column, Integer, String,Float

from database import Base


class InsurancePolicy(Base):
    __tablename__ = "Insurance_policies"

    id = Column(Integer, primary_key=True,index=True)
    name = Column(String, index = True)
    policy_type = Column(String, index = True)
    premium = Column(Float)
    coverage_amount = Column(Float)

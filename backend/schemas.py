from typing import List
from pydantic import BaseModel


class PolicyBase(BaseModel):
    name : str
    policy_type : str
    premium : float
    coverage_amount : float

class Policy(PolicyBase):
    id: int

    class Config:
        orm_mode =True

class PagainationPolicyResponse(BaseModel):
    total_items:int
    total_pages : int
    results: List[Policy]


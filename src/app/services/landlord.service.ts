import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class LandlordService {

  apiRoot = 'http://localhost:3010';
  constructor(private http: Http) { }

  insertPersonalInfo(detail) {
    const url = `${this.apiRoot}/api/lease/personal-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertBusinessEntity(detail) {
    const url = `${this.apiRoot}/api/lease/business-entity`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertBuildingInfo(detail) {
    const url = `${this.apiRoot}/api/lease/building-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  insertPremisesInfo(detail) {
    const url = `${this.apiRoot}/api/lease/premises-info`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }
  insertLeaseTerms(detail){
    const url = `${this.apiRoot}/api/lease/lease-terms`
    return this.http.post(url,detail)
      .map((res: Response) => res.json());
  }

  getLeaseByUserID(id){
    const url = `${this.apiRoot}/api/lease/getlist-user/`+ id
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

}
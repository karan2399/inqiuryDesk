import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StatusModel } from '../model/status.model';
import { Observable } from 'rxjs';
import { API_RESPONSE } from '../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class Status {

  http = inject(HttpClient);


  getAllStatuses()  : Observable<API_RESPONSE> {
    return this.http.get<API_RESPONSE>("https://api.freeprojectapi.com/api/Enquiry/get-statuses");
  }

  createNewStatus(data: StatusModel) : Observable<API_RESPONSE>{
    return this.http.post<API_RESPONSE>("https://api.freeprojectapi.com/api/Enquiry/create-status", data);
  }

  updateStatus(data: StatusModel) : Observable<API_RESPONSE> {
    return this.http.put<API_RESPONSE>("https://api.freeprojectapi.com/api/Enquiry/update-status/" + data.statusId, data);
  }

  deleteStatus(id:number) : Observable<API_RESPONSE> {
    return this.http.delete<API_RESPONSE>("https://api.freeprojectapi.com/api/Enquiry/delete-status/" + id);
  }
}

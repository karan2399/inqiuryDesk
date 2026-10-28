import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_RESPONSE } from '../model/common.model';
import { IEnquiry } from '../model/enquiry.model';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {

  http = inject(HttpClient);

  saveNewEnquiery(data:any) : Observable<API_RESPONSE> {
    return this.http.post<API_RESPONSE>('https://api.freeprojectapi.com/api/Enquiry/create-enquiry',data);
  }


  getAllEnquiries(): Observable<API_RESPONSE> {
    return this.http.get<API_RESPONSE>("https://api.freeprojectapi.com/api/Enquiry/get-enquiries");
  }

  getEnquiryById(id: number): Observable<API_RESPONSE> {
    return this.http.get<API_RESPONSE>(`https://api.freeprojectapi.com/api/Enquiry/get-enquiry/${id}`);
  }

  updateEnquiry(data: IEnquiry): Observable<API_RESPONSE> {
    return this.http.put<API_RESPONSE>(
      `https://api.freeprojectapi.com/api/Enquiry/update-enquiry/${data.enquiryId}`,
      data,
    );
  }
}

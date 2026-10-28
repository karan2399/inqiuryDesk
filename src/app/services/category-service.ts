import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_RESPONSE } from '../model/common.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  http = inject(HttpClient)

   getAllCategories():Observable<API_RESPONSE> {
    return this.http.get<API_RESPONSE>('https://api.freeprojectapi.com/api/Enquiry/get-categories');
  }
}

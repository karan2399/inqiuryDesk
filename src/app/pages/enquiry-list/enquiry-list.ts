import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';
import { EnquiryService } from '../../services/enquiry-service';
import { API_RESPONSE } from '../../model/common.model';
import { CategoryService } from '../../services/category-service';
import { Status } from '../../services/status';

@Component({
  selector: 'app-enquiry-list',
  imports: [RouterLink, AdminTopbar, AdminSidebar],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList {

  inquiryService = inject(EnquiryService);
  categoryService =inject(CategoryService);
  statusService =inject(Status);


  inquiryList = signal<any[]>([]);
  categoryList = signal<any[]>([]);
  statusList = signal<any[]>([]);

  ngOnInit(){
    this.loadAllInquiries();
    this.loadAllCategories();
    this.loadStatusList();

    
  }


  loadStatusList(){
    this.statusService.getAllStatuses().subscribe({
      next:(res: API_RESPONSE) => {
            const response = res as API_RESPONSE;
            if(!!response.result){
              this.statusList.set(response.data);
            }
          }
    })
  }
  loadAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(res: API_RESPONSE) => {
            const response = res as API_RESPONSE;
            if(!!response.result){
              this.categoryList.set(response.data);
            }
          }
    })
  }
  loadAllInquiries() {
      this.inquiryService.getAllEnquiries().subscribe({
          next:(res: API_RESPONSE) => {
            const response = res as API_RESPONSE;
            if(!!response.result){
              this.inquiryList.set(response.data);
            }
          }
      })  
  }
}

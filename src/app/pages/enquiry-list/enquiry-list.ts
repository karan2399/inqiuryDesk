import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';
import { EnquiryService } from '../../services/enquiry-service';
import { API_RESPONSE } from '../../model/common.model';
import { CategoryService } from '../../services/category-service';
import { Status } from '../../services/status';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiry-list',
  imports: [RouterLink, AdminTopbar, AdminSidebar, DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList {

  inquiryService = inject(EnquiryService);
  categoryService =inject(CategoryService);
  statusService =inject(Status);
  selectedStatus = signal('');


  inquiryList = signal<any[]>([]);
  categoryList = signal<any[]>([]);
  statusList = signal<any[]>([]);

  readonly pageSize = 10;
  readonly currentPage = signal(1);

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filteredInquiries().length / this.pageSize))
  );

  readonly paginatedInquiries = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredInquiries().slice(start, start + this.pageSize);
  });

  readonly showingStart = computed(() =>
    this.filteredInquiries().length
      ? (this.currentPage() - 1) * this.pageSize + 1
      : 0
  );

  readonly showingEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filteredInquiries().length)
  );




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


  changeStatus(event: Event): void {
    this.selectedStatus.set((event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  filteredInquiries = computed(() => {
  const status = this.selectedStatus();
  const inquiries = this.inquiryList();

  return status
    ? inquiries.filter(inquiry => inquiry.statusName === status)
    : inquiries;
  });



  countForStatus(statusName: string): number {
    const target = statusName.trim().toLowerCase();

    return this.inquiryList().filter(
      inquiry => inquiry.statusName?.trim().toLowerCase() === target
    ).length;
  }

  goToPage(page: number): void {
    this.currentPage.set(Math.max(1, Math.min(page, this.pageCount())));
  }
 
}

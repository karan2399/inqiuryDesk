import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-enquiry-list',
  imports: [RouterLink, AdminTopbar, AdminSidebar],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList {}

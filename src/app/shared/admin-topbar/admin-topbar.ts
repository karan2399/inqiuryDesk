import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-topbar',
  imports: [DatePipe],
  templateUrl: './admin-topbar.html',
  styleUrl: './admin-topbar.css',
})
export class AdminTopbar {
  @Input({ required: true }) section = '';

  protected readonly today = new Date();

  constructor(private readonly router: Router) {}

  logout(): void {
    localStorage.removeItem('enquiryApp');
    void this.router.navigateByUrl('/login');
  }
}

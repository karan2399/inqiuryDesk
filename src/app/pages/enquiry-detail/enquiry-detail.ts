import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory } from '../../model/category.model';
import { API_RESPONSE } from '../../model/common.model';
import { IEnquiry } from '../../model/enquiry.model';
import { CategoryService } from '../../services/category-service';
import { EnquiryService } from '../../services/enquiry-service';
import { Status } from '../../services/status';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';

@Component({
  selector: 'app-enquiry-detail',
  imports: [DatePipe, FormsModule, NgClass, RouterLink, AdminTopbar, AdminSidebar],
  templateUrl: './enquiry-detail.html',
  styleUrl: './enquiry-detail.css',
})
export class EnquiryDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly enquiryService = inject(EnquiryService);
  private readonly categoryService = inject(CategoryService);
  private readonly statusService = inject(Status);

  readonly enquiry = signal<IEnquiry | null>(null);
  readonly categories = signal<ICategory[]>([]);
  readonly statuses = signal<{ statusId: number; statusName: string }[]>([]);
  readonly loading = signal(true);
  readonly editing = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly saveError = signal('');
  readonly saveSuccess = signal('');
  readonly lookupError = signal('');
  readonly draft = signal<IEnquiry | null>(null);

  readonly categoryName = computed(() => {
    const enquiry = this.enquiry();
    return this.categories().find(category => category.categoryId === enquiry?.categoryId)?.categoryName;
  });

  readonly statusName = computed(() => {
    const enquiry = this.enquiry();
    return this.statuses().find(status => status.statusId === enquiry?.statusId)?.statusName;
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage.set('The inquiry ID is invalid.');
      this.loading.set(false);
      return;
    }

    this.loadEnquiry(id);
    this.loadLookups();
  }

  startEditing(): void {
    const enquiry = this.enquiry();
    if (!enquiry) return;

    this.draft.set({ ...enquiry });
    this.saveError.set('');
    this.saveSuccess.set('');
    this.editing.set(true);
  }

  cancelEditing(): void {
    this.editing.set(false);
    this.draft.set(null);
    this.saveError.set('');
  }

  updateDraft<K extends keyof IEnquiry>(field: K, value: IEnquiry[K]): void {
    const draft = this.draft();
    if (draft) this.draft.set({ ...draft, [field]: value });
  }

  updateDateTime(field: 'enquiryDate' | 'followUpDate', value: string): void {
    const date = value ? new Date(value) : null;
    this.updateDraft(field, date && !Number.isNaN(date.getTime()) ? date.toISOString() : '');
  }

  toDateTimeLocal(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return localDate.toISOString().slice(0, 16);
  }

  saveChanges(): void {
    const draft = this.draft();
    if (!draft || this.saving()) return;

    this.saving.set(true);
    this.saveError.set('');
    this.saveSuccess.set('');
    this.enquiryService.updateEnquiry({ ...draft }).subscribe({
      next: (response: API_RESPONSE) => {
        if (response.result) {
          this.enquiry.set({ ...draft });
          this.editing.set(false);
          this.draft.set(null);
          this.saveSuccess.set(response.message || 'Inquiry updated successfully.');
        } else {
          this.saveError.set(response.message || 'The inquiry could not be updated.');
        }
        this.saving.set(false);
      },
      error: () => {
        this.saveError.set('Unable to update this inquiry. Please try again.');
        this.saving.set(false);
      },
    });
  }

  statusClass(): string {
    const status = (this.statusName() ?? '').toLowerCase();
    if (status.includes('progress')) return 'progress';
    if (status.includes('resolv')) return 'resolved';
    if (status.includes('closed')) return 'closed';
    return 'open';
  }

  private loadEnquiry(id: number): void {
    this.enquiryService.getEnquiryById(id).subscribe({
      next: (response: API_RESPONSE) => {
        if (response.result && response.data) {
          this.enquiry.set(response.data as IEnquiry);
        } else {
          this.errorMessage.set(response.message || 'The inquiry could not be found.');
        }
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load this inquiry. Please try again.');
        this.loading.set(false);
      },
    });
  }

  private loadLookups(): void {
    const handleLookupError = () => {
      this.lookupError.set('Some category or status names could not be loaded; their IDs are shown instead.');
    };

    this.categoryService.getAllCategories().subscribe({
      next: (response: API_RESPONSE) => {
        if (response.result && Array.isArray(response.data)) {
          this.categories.set(response.data);
        } else {
          handleLookupError();
        }
      },
      error: handleLookupError,
    });

    this.statusService.getAllStatuses().subscribe({
      next: (response: API_RESPONSE) => {
        if (response.result && Array.isArray(response.data)) {
          this.statuses.set(response.data);
        } else {
          handleLookupError();
        }
      },
      error: handleLookupError,
    });
  }
}

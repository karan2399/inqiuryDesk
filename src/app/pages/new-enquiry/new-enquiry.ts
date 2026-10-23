import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { EnquiryService } from '../../services/enquiry-service';
import { CategoryService } from '../../services/category-service';
import { ICategory } from '../../model/category.model';
import { API_RESPONSE } from '../../model/common.model';

@Component({
  selector: 'app-new-enquiry',
  imports: [FormField],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css',
})
export class NewEnquiry {


  categoryService =  inject(CategoryService);
  inquieryService = inject(EnquiryService);
   categoryList = signal<ICategory[]>([]);

  ngOnInit(){
      this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getAllCategories().subscribe({
      next:(res:API_RESPONSE)=> {
        if(!!res.data){
          this.categoryList.set(res.data)
        }
      }
    });
  }


  inquiryService = inject(EnquiryService)

  newInquirySignal = signal({
      "enquiryId": 0,
      "customerName": "",
      "customerEmail": "",
      "customerPhone": "",
      "message": "",
      "categoryId": "",
      "statusId": Math.floor(Math.random() * 1000),
      "enquiryType": "",
      "isConverted": true,
      "enquiryDate": new Date(),
      "followUpDate": new Date(),
      "feedback": ""
  })

  inqiryForm = form(this.newInquirySignal);


  onSaveInquiry(){
    const formValue = this.inqiryForm().value;
    this.inquiryService.saveNewEnquiery(formValue()).subscribe({
      next:(res)=>{
        if(!!res){
          alert("Inquiery Received");
        }else {
          alert("Some Error occured");
        }
      },
      error :(err)=> {
         alert("Some Error occured");
      }
    })
  }

}

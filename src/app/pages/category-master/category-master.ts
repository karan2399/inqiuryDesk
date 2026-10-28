import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, Signal } from '@angular/core';
import { ICategory } from '../../model/category.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-category-master',
  imports: [FormsModule, NgClass, AdminTopbar, AdminSidebar],
  templateUrl: './category-master.html',
  styleUrl: './category-master.css',
})




export class CategoryMaster {
  http = inject(HttpClient);
  categoryList = signal<ICategory[]>([]);

  newCategoryObj: ICategory = {
    categoryId: 0,
    categoryName: "",
    isActive: false
  }


  ngOnInit() {
    this.getAllCategories();
  }


  constructor() {

  }

  getAllCategories() {
    this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories').subscribe({
      next: (res: any) => {
        if (!!res.result) {
          this.categoryList.set(res.data);
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  onSaveCategory() {
    this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-category", this.newCategoryObj).subscribe({
      next: (res: any) => {
        if (!!res.result) {
          alert("Category Created");
          this.getAllCategories();
        }
      },
      error: (error) => {
        alert(error.message);
        console.log(error);
      }
    })
  }



  onEdit(category: ICategory){
    const stringObj = JSON.stringify(category);
    const obj = JSON.parse(stringObj)
    this.newCategoryObj = obj;
  }
  onUpdate(category: ICategory) {
  
    this.http.put("https://api.freeprojectapi.com/api/Enquiry/update-category/" + category.categoryId, this.newCategoryObj).subscribe({
      next: (res: any) => {
        if (!!res.result) {
          alert("Category Updated");
          this.getAllCategories();
        }
      }, error: (error) => {
        console.log(error);
      }
    })
  }


  onDeleteCategory(id: number) {
    const isDelete = confirm("Are you sure you want to delete?")
    if (isDelete) {
      this.http.delete("https://api.freeprojectapi.com/api/Enquiry/delete-category/" + id).subscribe({
        next: (res: any) => {
          if (!!res.result) {
            alert("Category Deleted");
            this.getAllCategories();
          }
        }, error: (error) => {
          console.log(error);
        }
      })
    }

  }

}

import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../model/category.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-category-master',
  imports: [RouterLink, FormsModule, NgClass],
  templateUrl: './category-master.html',
  styleUrl: './category-master.css',
})




export class CategoryMaster {
  http = inject(HttpClient);
  categoryList  = signal<ICategory[]>([]); 
  
  newCategoryObj :ICategory = {
    categoryId:0,
    categoryName: "",
    isActive:false
  }


  ngOnInit(){
    this.getAllCategories();
  }


  constructor(){

  }

  getAllCategories(){
    this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories').subscribe({
      next:(res:any)=> {
        if(!!res.result){
            this.categoryList.set(res.data);
        } 
      },
      error:(err)=> {
        console.log(err);
        
      }
    })
  }

  onSaveCategory(){
    this.http.post("https://api.freeprojectapi.com/api/Enquiry/create-category",this.newCategoryObj).subscribe({
      next:(res:any)=> {
        if(!!res.result){
          alert("Category Created");
          this.getAllCategories();
        }
      },
      error:(error)=> {
        alert(error.message);
        console.log(error);
      }
    })
  }

}

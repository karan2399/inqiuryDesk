import { Component, inject, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../services/status';
import { StatusModel } from '../../model/status.model';
import { API_RESPONSE } from '../../model/common.model';
import { NgClass } from '@angular/common';
import { AdminTopbar } from '../../shared/admin-topbar/admin-topbar';
import { AdminSidebar } from '../../shared/admin-sidebar/admin-sidebar';


@Component({
  selector: 'app-status-master',
  imports: [ReactiveFormsModule, NgClass, AdminTopbar, AdminSidebar],
  templateUrl: './status-master.html',
  styleUrl: './status-master.css',
})
export class StatusMaster {

  statusForm !:FormGroup;
  statusService = inject(Status);
  statusList = signal<StatusModel[]>([]);

  constructor(){
    this.initForm();
  }

  ngOnInit(){
    this.getAllStatues();
  }
  initForm(){
    this.statusForm = new FormGroup({
      statusId : new FormControl(0),
      statusName: new FormControl(""),
      isActive: new FormControl(false)
    })
  }

  getAllStatues(){
    this.statusService.getAllStatuses().subscribe({
      next:(res:API_RESPONSE)=>{
        if(!!res.result){
          this.statusList.set(res.data);
        }
      }
    })
  }


  onSave(){
    const formValue = this.statusForm.value;
    this.statusService.createNewStatus(formValue).subscribe({
        next:(res:API_RESPONSE) => {
            if(!!res.result){
              alert(res.message);
              this.getAllStatues();
            }else {
              alert(res.message)
            }
        }
    })
  }

  onEdit(data:StatusModel){
      this.statusForm.setValue(data);
  }



  onUpdate(){
     this.statusService.updateStatus(this.statusForm.value).subscribe({
      next: (res: any) => {
        if (!!res.result) {
          alert("Status Updated");
          this.getAllStatues();
        }
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  onResetForm(){
    this.statusForm.reset();
  }

  onDelete(status:StatusModel){
    const isDelete = confirm("Are you sure you want to delete?")
    if (isDelete) {
      this.statusService.deleteStatus(status.statusId).subscribe({
        next: (res: any) => {
          if (!!res.result) {
            alert("Category Deleted");
            this.getAllStatues();
          }
        }, error: (error) => {
          console.log(error);
        }
      })
    }
  }
}

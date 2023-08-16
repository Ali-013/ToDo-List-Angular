
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITask } from 'src/app/models/task';
import { NgConfirmComponent, NgConfirmService } from 'ng-confirm-box';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent {
  @Output() s: EventEmitter<string> = new EventEmitter();
  todoForm!:FormGroup;
  updateForm!:FormGroup;
  tasks: ITask[]=[];
  inprogress: ITask[]=[];
  done: ITask[]=[];
  inputarea!:string;
  inputareaP!:string;
  updateIndex!:any;
  Editable:boolean = false;
  localItemtask!:any;
  localItemProgress!:any;
  localItemDone!:any;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  setit(s:ITask){
    this.todoForm.controls['item'].setValue(s.description);
  }
  updateTask(item: any) {
      item.description = this.todoForm.value.item;
       // Reset updateIndex after update
      this.todoForm.reset(); // Reset the form after update
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("done", JSON.stringify(this.done));
      localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
    
  }
};


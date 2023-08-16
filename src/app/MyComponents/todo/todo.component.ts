import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITask } from 'src/app/models/task';
import { NgConfirmComponent, NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Output() setit: EventEmitter<ITask> = new EventEmitter();
  todoForm!: FormGroup;
  updateForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  inputarea!: string;
  inputareaP!: string;
  updateIndex!: any;
  Editable: boolean = false;
  localItemtask!: any
  localItemProgress!: any
  localItemDone!: any
  constructor(private fb: FormBuilder, private toastr: ToastrService, private confirmservice: NgConfirmService) {
    this.localItemtask = localStorage.getItem("tasks")
    this.localItemDone = localStorage.getItem("done")
    this.localItemProgress = localStorage.getItem("inprogress")
    if (this.localItemtask == null) {
      this.tasks = []
    } else {
      this.tasks = JSON.parse(this.localItemtask)
      console.log(this.tasks)
    };

    if (this.localItemProgress == null) {
      this.inprogress = []
    } else {
      this.inprogress = JSON.parse(this.localItemProgress)
    };

    if (this.localItemDone == null) {
      this.done = []
    } else {
      this.done = JSON.parse(this.localItemDone)
    }
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  deleteTask(i: number) {
    const result = window.confirm("Delete Todo permanently?")
    if (result) {
      this.tasks.splice(i, 1)
      this.toastr.error("Todo Deleted!")
    }
    else {
      this.toastr.warning("Action Aborted!")
    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("done", JSON.stringify(this.done));
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress))

  }
  deleteProgressTask(i: number) {

    const result = window.confirm("Delete 'In Progress Todo' permanently?")
    if (result) {
      this.inprogress.splice(i, 1)
      this.toastr.error("'In Progress Todo' Deleted!")
    }
    else {
      this.toastr.warning("Action Aborted!")
    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("done", JSON.stringify(this.done));
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
  }
  deleteDoneTask(i: number) {
    const result = window.confirm("Delete 'Completed Todo' permanently?")

    if (result) {
      this.done.splice(i, 1)
      this.toastr.error("'Completed Todo' Deleted!")
    }
    else {
      this.toastr.warning("Action Aborted!")
    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("done", JSON.stringify(this.done));
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
  }
  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.Editable = true;
  }
  updateTask() {
    if (this.updateIndex !== undefined) {
      this.tasks[this.updateIndex].description = this.todoForm.value.item;
      this.tasks[this.updateIndex].done = false;
      // Reset updateIndex after update
      this.todoForm.reset(); // Reset the form after update
      this.Editable = false;
      this.updateIndex = undefined; // Reset Editable status
      this.toastr.info('Todo Updated');
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("done", JSON.stringify(this.done));
      localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
    }
  }
  onEditP(item: ITask, i: number) {
  this.setit.emit(item);

  }
  cancelTask() {
    this.todoForm.reset(); // Reset the form after update
    this.Editable = false;
    this.updateIndex = undefined;
  }
  addTask() {

    if (this.todoForm.value.item.trim() != "") {

      this.tasks.unshift({
        description: this.todoForm.value.item,
        done: false
      })
      this.todoForm.reset();

      this.toastr.success('Todo Added');
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  markDone(i: number) {
    const result = window.confirm("Mark Todo as Done!")

    if (result) {
      this.done.unshift(this.inprogress[i])
      this.inprogress.splice(i, 1)
      this.toastr.success("Todo Completed")
    }
    else {
      this.toastr.warning("Action Aborted!")
    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
     localStorage.setItem("done", JSON.stringify(this.done));
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("done", JSON.stringify(this.done));
    localStorage.setItem("inprogress", JSON.stringify(this.inprogress))
  }
}

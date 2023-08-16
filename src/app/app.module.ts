import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { TodoComponent } from './MyComponents/todo/todo.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import {NgConfirmModule} from 'ng-confirm-box';
import { UpdateformComponent } from './MyComponents/updateform/updateform.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoComponent,
    TodoComponent,
    UpdateformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    NgConfirmModule,
    ToastrModule.forRoot({
      timeOut: 1500,
  positionClass: 'toast-bottom-right',
  progressBar:true,
  progressAnimation:'increasing',
  preventDuplicates:true,
  closeButton:true,
  newestOnTop:true,
  
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

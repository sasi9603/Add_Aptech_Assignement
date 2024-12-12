  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppComponent } from './app.component';
  import { SidebarComponent } from './sidebar/sidebar.component';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { TableModule } from 'primeng/table';
  import { InputTextModule } from 'primeng/inputtext';
  import { MatTableModule } from '@angular/material/table';
  import { MatButtonModule } from '@angular/material/button';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

  @NgModule({
    declarations: [
      AppComponent,
      SidebarComponent
    ],
    imports: [
      BrowserModule,
      TableModule,
      HttpClientModule,
      InputTextModule,
      ReactiveFormsModule,
      MatTableModule,
      MatButtonModule,
      MatToolbarModule,
      FormsModule,
      BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

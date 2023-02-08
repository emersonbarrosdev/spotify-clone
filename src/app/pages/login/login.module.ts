import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login-routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)

  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

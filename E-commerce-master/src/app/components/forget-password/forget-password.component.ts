import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  errorMessage:string='';
  isLoading:boolean=false;
forGetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})
handelForGetPassword(form:FormGroup){
  this.isLoading=true;

  this._AuthService.forGetPassword(form.value).subscribe({
    next:(response)=>{console.log(response);
      this._Router.navigate(['/verify-reset-code']);
      this.isLoading=false;


    },
    error:(error)=>{
      console.log(error);
      this.errorMessage=error.error.message;
      this.isLoading=false;
    }
  })
}



 

}

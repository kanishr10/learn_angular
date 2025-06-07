import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
num: any;
showme = true;
color: any;
toDate = new Date();
message = "Welcome TO Angular";

value = "Kanish";

todo:any ;
dataForm!: FormGroup;

ngOnInit(){
  this.dataForm = this.fb.group({
    id:"",
    userId:"",
    title:"",
    completed:""
  })
}


constructor(private http: HttpClient, private fb: FormBuilder){
  this.http.get<any[]>('http://localhost:3000/user').subscribe((res)=>{
    this.todo = res;
    console.log(this.todo)
  })
}

onSubmit(){
  this.http.post<any[]>('http://localhost:3000/user',this.dataForm.value).subscribe((res)=>{
    this.todo = [res];
  })
  // console.log(this.dataForm.value.userId)
  // console.log(this.todo)
  // for(let val of this.todo){
  //   console.log(val.userId)
  // }
}
}

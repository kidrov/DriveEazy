import { Component, OnInit } from '@angular/core';
import { CarlistService } from 'src/app/carlist/carlist.service';
import { Carlist } from 'src/app/carlist/carlist.model';
import { TemplateBindingParseResult } from '@angular/compiler';


@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css'],
})
export class MycarsComponent implements OnInit {

  allCarList: Carlist[]=[];
  isUserHaveCar : boolean = false;
  ownerEmail : string ="";// localStorage.getItem('logedin_user_email');

  myCardStyle:any;

  constructor(private _carInventoryDb : CarlistService) {
    this._carInventoryDb.GetAll().subscribe(res=>{
      if(res.length>0){
        this.isUserHaveCar=true;
      }
      this.allCarList=res;
    })
  }
  ngOnInit(): void {
    this.ownerEmail = localStorage.getItem('logedin_user_email')!;
    
  }



}

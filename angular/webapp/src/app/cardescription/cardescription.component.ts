import { Component } from '@angular/core';
import { cardescService } from './cardesc.service';
import { Review } from 'src/Model/Review';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cardescription',
  templateUrl: './cardescription.component.html',
  styleUrls: ['./cardescription.component.css']
})
export class cardescriptionComponent   {
carDesc:any;
data:Review=new Review();
registtrationDate:Date=new Date();
constructor(private _cardescService: cardescService, private route:ActivatedRoute, private router:Router) {
  if(this.route.snapshot.params['carId']!=null && this.route.snapshot.params['carId'].length>0){
    this._cardescService.get_car_description(this.route.snapshot.params['carId']).subscribe(res=>{
      this.carDesc=res;
      this.registtrationDate = new Date(res.registrationYear);
      console.log(res);
    })
  }
 }

  ngOnInit() {
    this.loaddatabyid(this.route.snapshot.params['carId']);
  }

  reviewlist: any;

  loaddatabyid(id:string){
    
    this._cardescService.getreviewbycarid(id).subscribe(res=>{
      this.reviewlist = res;
    });
  }

  showAckno(carId:string){
    this.router.navigate(['ackno-booking', carId])
  }
}

import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})




export class HomeComponent implements OnInit {
 // temp will be the selected array from api
temp = { id: 'Aadhi', name: 'Dr Nice' };
arr = [
  { id: 'Aadhi', name: 'Dr Nice' },
  { id: 'Payanam', name: 'Narco' },
  { id: 'sd', name: 'Bombasto' },
  { id: 'sfdsf', name: 'Celeritas' },
  { id: 'dfdd', name: 'Magneta' },
];

add() {
  let flag = 1;
  for (let i of this.arr) {
if (this.temp.id === i.id ) {
  flag = 0;
}
  }
  if (flag && this.arr.length < 5){
  this.arr.push(this.temp); } else {
    console.log('Repeated | limit exceeded');
  }
}


remove(arg) {
  this.arr.splice(arg, 1);
  console.log(arg);
  console.log(this.arr);
}

  constructor() {
   }

  ngOnInit() {
  }

}


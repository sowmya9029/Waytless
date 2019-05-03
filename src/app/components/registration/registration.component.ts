import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
export interface User {
  value: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    // upload code goes here
  }
  
  disableSelect = new FormControl(false);
  constructor() { }

  ngOnInit() {
  }

}

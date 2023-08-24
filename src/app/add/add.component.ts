import { Component, OnInit } from '@angular/core';
import { genders } from '../gender';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  user: User = new User();
  genders = genders
  users: User[] = []
  constructor(private apiService: DataService, private snackBar: MatSnackBar, private router: Router, private storedata: DataSharingService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.storedata.getData().subscribe((data: any) => {
      this.users = data;
    })
    this.user.id = this.users.length + 1;
    this.users.push(this.user);
    this.storedata.setData(this.users);
    this.apiService.addData(this.user).subscribe((data: any) => {
      this.snackBar.open(`User with ID ${this.user.id} has been added`, "Close", {duration: 3000})
    })
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LoaderService } from '../loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading = false
  users: User[] = [];
  displayColumns = ['id', 'firstName', 'lastName', 'gender', 'age', 'actions'];
  constructor(private apiService: DataService, public loader: LoaderService, public dialog: MatDialog, private snackBar: MatSnackBar, private storeData: DataSharingService) {}

  ngOnInit(): void {
    this.storeData.getData().subscribe((data) => {
      this.users = data;
    })
    
    this.apiService.getData().subscribe((data: any) => {
      if (this.users.length > 0) {
        this.storeData.getData().subscribe((data: any) => {
          this.users = data;
        })
      }
      else {
        this.users = data.users;
        this.storeData.setData(data.users)
      }
    })
  }

  deleteUser(id: number) {
    this.apiService.deleteData(id).subscribe((data: any) => {
      this.snackBar.open(`User with ID ${data.id} deleted successfully`, "Close", {duration: 3000})
    })
    this.storeData.setData(this.users.filter((user) => user.id !== id));
  }

  openDialog(id: number) {
    let dialogRef = this.dialog.open(DialogComponent, {data: {id: id}})

    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.deleteUser(id)
      }
    })
  }
}

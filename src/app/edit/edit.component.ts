import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { genders } from "../gender";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../user";
import { DataSharingService } from "../data-sharing.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  userId: number = 0;
  genders = genders;
  user: any = new User();
  users: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private apiService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private storeData: DataSharingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params.id;
    });

    this.storeData.getData().subscribe((data: any) => {
      this.users = data
    })

    this.user = this.users.find((user) => user.id == this.userId);

    this.apiService.getDataById(this.userId).subscribe((data: any) => {});
  }

  onSubmit() {
    this.storeData.getData().subscribe((data: any) => {
      this.users = data;
    });
    let temp: any = this.users.find((user) => user.id == this.userId);
    Object.assign(temp, this.user);
    this.apiService
      .updateDataById(this.userId, this.user)
      .subscribe((data: any) => {});
    this.snackBar.open(
      `User with ID ${this.userId} has been updated`,
      "Close",
      { duration: 3000 }
    );
    this.router.navigate(["/"]);
  }
}

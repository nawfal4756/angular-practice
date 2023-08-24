import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  displayColumns = ["id", "city", "area", "actions"]
  constructor(public citiesShared: CitiesDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(id: number) {
    let dialogRef = this.dialog.open(DialogComponent, {data: {id: id}})

    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.citiesShared.deleteData(id)
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CityapiService } from '../cityapi.service';
import { CitiesDataService } from '../cities-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cities-form',
  templateUrl: './cities-form.component.html',
  styleUrls: ['./cities-form.component.css']
})
export class CitiesFormComponent implements OnInit {
  tempCity = ""
  citiesForm: FormGroup = new FormGroup({})
  citiesList = []
  areaList = []
  constructor(private fb: FormBuilder, private citiesApi: CityapiService, private citiesData: CitiesDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.citiesForm = this.fb.group({
      id: "",
      city: ["", [Validators.required]],
      area: ["", [Validators.required]]
    })

    this.citiesApi.getCities().subscribe((data: any) => {
      this.citiesList = data
    })

    this.citiesForm.valueChanges.subscribe((data: any) => {
      if (this.tempCity != data.city) {
        this.citiesApi.getAreas(data.city).subscribe((data: any) => {
          this.areaList = data
        })
        this.tempCity = data.city
      }
    })

    this.route.params.subscribe((params) => {
      if (params.id) {
        let tempData = this.citiesData.getCity(params.id)
        this.citiesForm.patchValue(tempData)
      }
    })
  }

  onSubmit() {
    if (this.citiesData.getCity(this.citiesForm.value.id)) {
      this.citiesData.updateData(this.citiesForm.value.id, this.citiesForm.value)
      this.router.navigate(["/cities"])
    }
    else {
      this.citiesForm.value.id = this.citiesData.getLength() + 1
      this.citiesData.addData(this.citiesForm.value)
      this.router.navigate(["/cities"])
    }
  }

  get city() {
    return this.citiesForm.get("city")
  }

  get area() {
    return this.citiesForm.get("area")
  }

}

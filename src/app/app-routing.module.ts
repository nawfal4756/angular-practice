import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { CitiesComponent } from './cities/cities.component';
import { CitiesFormComponent } from './cities-form/cities-form.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "edit/:id", component: EditComponent},
  {path: "add", component: AddComponent},
  {path: "cities", component: CitiesComponent,},
  {path: "cities/add", component: CitiesFormComponent},
  {path: "cities/edit/:id", component: CitiesFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

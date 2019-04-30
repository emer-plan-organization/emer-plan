import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {surveyRoutes,assessRoutes,planRoutes,otherRoutes} from './router'


/*const routes:Routes=[
	{
		path:'emer',
		children:[...surveyRoutes,...otherRoutes]
	}
	
]*/

const routes:Routes=[...surveyRoutes,...assessRoutes,...planRoutes,...otherRoutes]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

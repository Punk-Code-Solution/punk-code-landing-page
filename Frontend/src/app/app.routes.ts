import { Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageServicesComponent } from './pages/page-services/page-services.component';
import { PageContactComponent } from './pages/page-contact/page-contact.component';
import { PageAboutComponent } from './pages/page-about/page-about.component';

export const routes: Routes = [
  {
    path: "",
    component: PageHomeComponent
  },
  {
    path: "services",
    component: PageServicesComponent
  },
  {
    path: "contact",
    component: PageContactComponent
  },
  {
    path: "about",
    component: PageAboutComponent
  }
];

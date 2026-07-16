import { Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageServicesComponent } from './pages/page-services/page-services.component';
import { PageContactComponent } from './pages/page-contact/page-contact.component';
import { PageAboutComponent } from './pages/page-about/page-about.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';
import { PageBlogComponent } from './pages/page-blog/page-blog.component';
import { PageBlogPostComponent } from './pages/page-blog-post/page-blog-post.component';

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
    path: "projects",
    component: PageProjectsComponent
  },
  {
    path: "blog",
    component: PageBlogComponent
  },
  {
    path: "blog/:slug",
    component: PageBlogPostComponent
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

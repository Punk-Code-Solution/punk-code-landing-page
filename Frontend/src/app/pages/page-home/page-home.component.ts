import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';
import { MainBannerComponent } from '../../components/main-banner/main-banner.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { SolutionComponent } from '../../components/solution/solution.component';
import { ServiceComponent } from '../../components/service/service.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MainBannerComponent,
    TestimonialsComponent,
    SolutionComponent,
    ServiceComponent,
    FaqComponent,
    FooterComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css',
})
export class PageHomeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    const pageTitle = 'Punk Code Solution | Inovação em Desenvolvimento Web';
    const pageDescription =
      'A Punk Code Solution é sua parceira em soluções digitais inovadoras. Especializados em desenvolvimento web, transformamos ideias em realidade com tecnologia de ponta e design centrado no usuário.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });
  }
}

import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainBannerComponent } from '../../components/main-banner/main-banner.component';
import { ProofPointsComponent } from '../../components/proof-points/proof-points.component';
import { SaasSectionComponent } from '../../components/saas-section/saas-section.component';
import { ProjectCaseComponent } from '../../components/project-case/project-case.component';
import { CustomServicesComponent } from '../../components/custom-services/custom-services.component';
import { LeadCaptureComponent } from '../../components/lead-capture/lead-capture.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'page-home',
  imports: [
    NavbarComponent,
    MainBannerComponent,
    ProofPointsComponent,
    SaasSectionComponent,
    ProjectCaseComponent,
    CustomServicesComponent,
    LeadCaptureComponent,
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
    const pageTitle = 'Punk Code Solution | Sistemas prontos e projetos sob medida';
    const pageDescription =
      'Assine produtos prontos para igreja, estúdio, marketplace e ligas — ou contrate um projeto exclusivo. Diagnóstico, entrega e suporte com a Punk Code Solution.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });
  }
}

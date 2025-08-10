import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ServiceSolutionComponent } from '../../components/service-solution/service-solution.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common'

@Component({
  selector: 'page-services',
  standalone: true,
  imports: [
    NavbarComponent,
    ServiceSolutionComponent,
    FooterComponent,
    NgFor
  ],
  templateUrl: './page-services.component.html',
  styleUrl: './page-services.component.css'
})
export class PageServicesComponent {

  services = [

    {
      icon: 'fa fa-code', // Exemplo de classe de ícone
      title: 'Desenvolvimento Web',
      description: 'Sites institucionais, e-commerces e aplicações web modernas e responsivas.',
      features: ['Design responsivo', 'SEO otimizado', 'Performance alta', 'Segurança avançada']
    },
    // {
    //   icon: 'fa fa-mobile',
    //   title: 'Desenvolvimento Mobile',
    //   description: 'Aplicações nativas e híbridas para Android e iOS, focadas na experiência do usuário.',
    //   features: ['Interface intuitiva', 'Notificações push', 'Integração com APIs', 'Publicação nas lojas']
    // },
    {
      icon: 'fa fa-cloud',
      title: 'Soluções em Nuvem',
      description: 'Infraestrutura escalável e segura na nuvem para suas aplicações e dados.',
      features: ['Arquitetura serverless', 'Bancos de dados gerenciados', 'CI/CD', 'Monitoramento 24/7']
    },
    {
      icon: 'fa-solid fa-bug',
      title: 'Teste de Software',
      description: 'Consultoria em testes de software e automação de testes.',
      features: ['Testes automatizados', 'Testes de unidade', 'Testes de integração', 'Testes de sistema']
    }

  ]

}


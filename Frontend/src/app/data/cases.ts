import { whatsappUrl } from './whatsapp';

export interface ProjectCase {
  id: string;
  anchor: string;
  badge: string;
  name: string;
  headline: string;
  body: string;
  outcomes: string[];
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export const FINANCAS_NEWS_CASE: ProjectCase = {
  id: 'financas-news',
  anchor: 'case-financas-news',
  badge: 'Projeto desenvolvido pela Punk Code',
  name: 'Finanças News',
  headline: 'Portal de inteligência financeira — um exemplo do que construímos sob medida.',
  body: 'Criamos o Finanças News para consolidar notícias e tendências do mercado em um só lugar, com entrega clara para quem precisa decidir com contexto. Não é um produto à venda: é um case real da nossa engenharia sob medida.',
  outcomes: [
    'Leitura e organização de tendências do mercado financeiro',
    'Consolidação de notícias em tempo real',
    'Experiência centralizada para tomada de decisão',
    'Exemplo real de entrega sob medida da Punk Code',
  ],
  ctaLabel: 'Quero um projeto assim',
  ctaHref: whatsappUrl('Olá! Quero um projeto no estilo Finanças News.'),
  imageSrc: 'images/projects/financas-news-preview.png',
  imageAlt: 'Portal Finanças News',
};

import { whatsappUrl } from './whatsapp';

export interface SaasProduct {
  id: string;
  anchor: string;
  name: string;
  cardLine: string;
  cardCta: string;
  headline: string;
  features: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
  theme: 'light' | 'dark';
}

export const SAAS_PRODUCTS: SaasProduct[] = [
  {
    id: 'igreja-40',
    anchor: 'igreja-40',
    name: 'Igreja 4.0',
    cardLine: 'Gestão completa da igreja em um só lugar',
    cardCta: 'Ver demonstração',
    headline: 'Igreja organizada, finanças claras e membros bem acompanhados.',
    features: [
      'Cadastro e gestão de membros e famílias',
      'Controle de dízimos, ofertas e despesas com relatórios e exportação em PDF',
      'Agenda de eventos e escalas por ministério',
      'Gestão de células, grupos e ministérios',
      'Salas de oração online integradas',
      'Perfis de acesso por cargo (admin, pastor, tesoureiro, secretaria e líder)',
    ],
    primaryCta: {
      label: 'Ver Demonstração',
      href: whatsappUrl('Olá! Quero demonstração do Igreja 4.0.'),
    },
    secondaryCta: {
      label: 'Assinar',
      href: whatsappUrl('Olá! Quero assinar o Igreja 4.0.'),
    },
    imageSrc: 'images/projects/igreja-4-0-dashboard.png',
    imageAlt: 'Painel do Igreja 4.0',
    theme: 'light',
  },
  {
    id: 'studio-style',
    anchor: 'studio-style',
    name: 'Studio & Style',
    cardLine: 'Agenda, equipe e caixa do seu estúdio sob controle',
    cardCta: 'Agendar demonstração',
    headline: 'Menos fila no WhatsApp. Mais horário cumprido e caixa fechado no fim do dia.',
    features: [
      'Dashboard com métricas do negócio em tempo real',
      'Agendamento online e controle da agenda da equipe',
      'Gestão de clientes, serviços e histórico',
      'Módulo financeiro com DRE e comissões',
      'Fechamento de caixa simplificado',
      'Integração com WhatsApp para confirmações e lembretes',
    ],
    primaryCta: {
      label: 'Agendar Demonstração',
      href: whatsappUrl('Olá! Quero agendar uma demonstração do Studio & Style.'),
    },
    secondaryCta: {
      label: 'Assinar',
      href: whatsappUrl('Olá! Quero assinar o Studio & Style.'),
    },
    imageSrc: 'images/projects/studio-style-preview.png',
    imageAlt: 'Painel do Studio & Style',
    theme: 'dark',
  },
  {
    id: 'app-pronto',
    anchor: 'app-pronto',
    name: 'App Pronto',
    cardLine: 'Clientes e profissionais conectados: agenda, chat e atendimento à distância',
    cardCta: 'Solicitar acesso',
    headline:
      'Conecte quem precisa de um serviço a quem presta — com agenda, conversa e atendimento à distância.',
    features: [
      'Busca por especialidade e agendamento com horários validados',
      'Chat e notificações in-app e push para cliente e profissional',
      'Atendimento por vídeo (teleconsulta / consulta remota)',
      'Pagamentos integrados na jornada',
      'Perfis separados para cliente e profissional',
    ],
    primaryCta: {
      label: 'Solicitar Acesso',
      href: whatsappUrl('Olá! Quero solicitar acesso ao App Pronto.'),
    },
    secondaryCta: {
      label: 'Ver Demonstração',
      href: whatsappUrl('Olá! Quero demonstração do App Pronto.'),
    },
    imageSrc: 'images/projects/app-pronto-preview.png',
    imageAlt: 'Prévia do App Pronto',
    theme: 'light',
  },
  {
    id: 'gamers-league',
    anchor: 'gamers-league',
    name: 'Gamers League',
    cardLine: 'Ligas, partidas e desempenho dos jogadores em um só lugar',
    cardCta: 'Conhecer a plataforma',
    headline: 'Organize ligas e acompanhe a performance dos jogadores — do chaveamento ao ranking.',
    features: [
      'Ligas em mata-mata, grupos + playoffs, 1v1 e pickup',
      'Controle de partidas, séries BO1/BO3 e veto de mapas',
      'Upload e análise de demos com estatísticas de performance',
      'Rankings, perfis por jogador e evolução ao longo da temporada',
      'Painel para organizadores e administradores',
    ],
    primaryCta: {
      label: 'Conhecer a Plataforma',
      href: whatsappUrl('Olá! Quero conhecer o Gamers League.'),
    },
    secondaryCta: {
      label: 'Solicitar Demonstração',
      href: whatsappUrl('Olá! Quero demonstração do Gamers League.'),
    },
    imageSrc: 'images/projects/gamers-league-preview.png',
    imageAlt: 'Prévia do Gamers League',
    theme: 'dark',
  },
];

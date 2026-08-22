export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    id: 'sob-medida',
    title: 'Software sob medida',
    description:
      'Plataformas web e aplicativos exclusivos alinhados à regra do seu negócio.',
  },
  {
    id: 'qa-pack',
    title: 'QA Pack',
    description:
      'Auditoria de qualidade e segurança: falhas, estabilidade e testes automatizados.',
  },
  {
    id: 'consultoria',
    title: 'Consultoria e otimização',
    description:
      'Diagnóstico e recuperação de sistemas lentos ou travados no dia a dia.',
  },
];

export const SERVICE_PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: 'Diagnóstico',
    description: 'Entendemos o problema de negócio e o que precisa mudar na operação.',
  },
  {
    step: 2,
    title: 'Escopo',
    description: 'Definimos o que será entregue, prazos e o caminho mais seguro.',
  },
  {
    step: 3,
    title: 'Entrega',
    description: 'Construímos, validamos com você e colocamos em uso no dia a dia.',
  },
  {
    step: 4,
    title: 'Suporte',
    description: 'Acompanhamos a evolução e mantemos a operação estável.',
  },
];

export const PROOF_POINTS = [
  'Sistemas prontos com planos claros — você assina e começa a usar.',
  'Projetos exclusivos quando o seu processo não cabe em um produto padrão.',
  'Acompanhamento próximo: do diagnóstico ao suporte contínuo.',
];

/** Opções do select de interesse (formulário / contato). Sem Finanças News. */
export const INTEREST_OPTIONS = [
  { value: 'igreja-40', label: 'Igreja 4.0' },
  { value: 'studio-style', label: 'Studio & Style' },
  { value: 'app-pronto', label: 'App Pronto' },
  { value: 'gamers-league', label: 'Gamers League' },
  { value: 'sob-medida', label: 'Software sob medida' },
  { value: 'qa-pack', label: 'QA Pack' },
  { value: 'consultoria', label: 'Consultoria' },
] as const;

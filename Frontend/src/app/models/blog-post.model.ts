export type BlogPostType = 'original' | 'radar';

export interface BlogSource {
  name: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  type: BlogPostType;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingMinutes: number;
  /** Parágrafos do corpo — texto original da Punk Code */
  body: string[];
  /** Bloco opcional de takeaways / checklist */
  takeaways?: string[];
  /** Apenas posts radar: crédito e link da fonte (sem republicar o texto) */
  source?: BlogSource;
  /** Comentário editorial curto sobre o que a notícia muda na prática */
  radarComment?: string;
  /** Se true, exibe aviso de assistência por IA na edição */
  aiAssisted?: boolean;
  relatedProjectIds?: string[];
}

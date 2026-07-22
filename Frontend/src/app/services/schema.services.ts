import { Injectable, Inject, DOCUMENT } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  /**
   * Adiciona um script JSON-LD ao <head> do documento.
   * @param id Um ID único para a tag de script (ex: 'service-schema')
   * @param schema O objeto JSON-LD a ser injetado.
   */
  addSchema(id: string, schema: any): void {
    // Primeiro, remove qualquer schema existente com o mesmo ID
    this.removeSchema(id);

    // Cria o novo script
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id; // Define o ID para que possamos encontrá-lo e removê-lo
    script.text = JSON.stringify(schema);
    
    // Adiciona o script ao <head>
    this.document.head.appendChild(script);
  }

  /**
   * Remove um script JSON-LD do <head> baseado no ID.
   * @param id O ID único da tag de script a ser removida.
   */
  removeSchema(id: string): void {
    const existingScript = this.document.getElementById(id);
    if (existingScript) {
      this.document.head.removeChild(existingScript);
    }
  }
}
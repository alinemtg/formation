import { Musica } from './musica';
import { Usuario } from './usuario';

export class Formacao {
    musica: Musica;
    usuarios: Usuario[][];
    usuariosVisualizados: Usuario[];
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.musica = new Musica();
      this.usuarios = [[]];
      this.usuariosVisualizados = [];
    }
  
    clone(): Formacao {
      var formacao: Formacao = new Formacao();
      formacao.copyFrom(this);
      return formacao;
    }
  
    copyFrom(from: Formacao): void {
      this.musica = from.musica;
      this.usuarios = from.usuarios;
      this.usuariosVisualizados = from.usuariosVisualizados;
    }

  }

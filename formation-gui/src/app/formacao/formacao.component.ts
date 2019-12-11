import { Formacao } from '../../../../formation-common/formacao';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormacaoService } from './formacao.service'
import { MusicasService } from '../musica/musica.service';
import { Musica } from '../../../../formation-common/musica';
import { Usuario } from '../../../../formation-common/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-formacao',
  templateUrl: './formacao.component.html',
  styleUrls: ['./formacao.component.scss']
})
export class FormacaoComponent implements OnInit {

  formacao : Formacao = new Formacao();
  formacoes : Formacao[] = [];
  musicas: Musica[] = [];
  musica: Musica;
  usuariosNovaFormacao: Usuario[][] = [[]];
  criandoNovaFormacao: boolean = false;

  constructor(private formacaoService : FormacaoService, private musicasService : MusicasService, private snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.formacaoService.getFormacoes()
      .subscribe(
        as => { this.formacoes = as; },
        msg => { alert(msg.message); }
      );
  }

  novaFormacao() {
    if (!this.criandoNovaFormacao) {
      this.usuariosNovaFormacao = [[]];
      this.formacao = new Formacao();
      this.musicasService.getMusicas()
      .subscribe(
        as => { this.musicas = as; },
        msg => { alert(msg.message); }
      );
      this.criandoNovaFormacao = true;
    } else {
      this.criandoNovaFormacao = false;
    }
  }

  selecionouMusica() {
    this.usuariosNovaFormacao = new Array(this.musica.integrantes.length);
  }

  submeter() {
    this.formacao.musica = this.musica;
    this.formacao.usuarios = this.usuariosNovaFormacao;
    
    console.log(this.formacao);
    this.formacaoService.criar(this.formacao)
      .subscribe(
        ar => {
          if (ar) {
            this.formacoes.push(this.formacao);
            this.formacao = new Formacao();
            this.criandoNovaFormacao = false;
            this.snackBar.open('Formação criada com sucesso!', 'OK')
          }
        },
        msg => { alert(msg.message); }
      );
  }

  carregarMusicasComInteressados() {
      return this.musicas.filter(musica => musica.usuariosInteressados.length != 0)
  }

}
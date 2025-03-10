import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

// FUNCOES

let sameArtista = ((elem, artista) => elem.element(by.name('artistalist')).getText().then(text => text === artista));
let sameTitulo = ((elem, titulo) => elem.element(by.name('titulolist')).getText().then(text => text === titulo));
let sameID = ((elem, id) => elem.element(by.name('idlist')).getText().then(text => text === id));

let pAND = ((p,q,r) => p.then(a => q.then(b => r.then(c => (a && b) && c))))

async function cadastrarMusica(titulo, artista, integrantes, id), {
    await $("input[name='titulobox']").sendKeys(<string> titulo);
    await $("input[name='artistabox']").sendKeys(<string> artista);
    await $("input[name='integrantesbox']").sendKeys(<string> integrantes);
    await $("input[name='idbox']").sendKeys(<string> id);
    await element(by.buttonText('Adicionar')).click();
}


// - - - - - - - - - PASSOS - - - - - - - - -

defineSupportCode(function ({ Given, When, Then }) {

    // - - - - - - - - - - - Scenario I - - - - - - - - - - -

    Given(/^eu estou logada como "([^\"]*)" com CPF "(\d*)"$/, async (nome, cpf) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Formation');
        // CADASTRO
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='nomebox']").sendKeys(<string> nome);
        await element(by.buttonText('Cadastrar')).click();
        // LOGIN
        await $("input[name='loginbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Fazer login')).click();
    })

    Given(/^eu estou eu estou na pagina de montagem de formacao$/, async () => {
        await browser.get("http://localhost:4200/administrador");
        await $("[name='montagemformacao']").click();
    })

    Given(/^existe uma musica com titulo "([^\"]*)", artista "([^\"]*)", integrantes "([^\"]*)", ID "(\d*)" e usuários interessados "([^\"]*)"$/, 
    async (titulo, artista, integrantes, id, usuariosInteressados) => {

        await cadastrarMusica(titulo,artista,integrantes,id);
        usuariosInteressados.forEach(usuario => {
            // CADASTRO
            await $("input[name='cpfbox']").sendKeys(<string> usuario.cpf);
            await $("input[name='nomebox']").sendKeys(<string> usuario.nome);
            await element(by.buttonText('Cadastrar')).click();
            // LOGIN
            await $("input[name='loginbox']").sendKeys(<string> usuario.cpf);
            await element(by.buttonText('Fazer login')).click();
            // MARCAR INTERESSE NA MUSICA
            await element(by.id('toggle')).click();
        });
    
    })

    When (/^eu seleciono criar nova formacao/$), async() =>{
        await element(by.id('criarFormacao')).click();
    }   

    When (/^eu associo os integrantes "([^\"]*)" , "([^\"]*)" e "([^\"]*)" da música "([^\"]*)", ID "([^\"]*)", com os usuarios "([^\"]*)", "([^\"]*)" e ""([^\"]*)", respectivamente/$), 
    async(integrante1, integrante2, integrante3, musica, id, usuario1, usuario2, usuario3) =>{
        var allusuarios: ElementArrayFinder = element.all(by.name('usuarioslist'));
        var s_usuario1 = allusuarios.filter(elem => elem.cpf == usuario1.cpf);
        var s_usuario2 = allusuarios.filter(elem => elem.cpf == usuario2.cpf);
        var s_usuario3 = allusuarios.filter(elem => elem.cpf == usuario3.cpf);

        var allmusicas : ElementArrayFinder = element.all(by.name('musicaslist'));
        var samemusica = allmusicas.filter(elem => sameID(elem,id));

        var allformacoes : ElementArrayFinder = element.all(by.name('formacoeslist'));
        var sameformacao = allformacoes.filter(elem => elem.musica == samemusica);
        
        sameformacao.associacao[ sameformacao.associacao.find(integrante1) ].push(usuario1);

    }  

    When (/^eu seleciono submeter formacao/$), async() =>{
        await element(by.id('criarFormacao')).click();
    }  

    When (/^eu seleciono a música "([^\"]*)"/$), async() =>{
        element(by.id('submeterFormacao')).click();
    }  

    Then (/^Then eu posso ver na lista de formacoes os integrantes "([^\"]*)" , "([^\"]*)" e "([^\"]*)" da música "([^\"]*)", id "([^\"]*)", com os usuarios "([^\"]*)", "([^\"]*)" e ""([^\"]*)", respectivamente/$)
    , async(integrante1, integrante2, integrante3, musica, id, usuario1, usuario2, usuario3) =>{
        var allusuarios: ElementArrayFinder = element.all(by.name('usuarioslist'));
        var s_usuario1 = allusuarios.filter(elem => elem.cpf == usuario1.cpf);
        var s_usuario2 = allusuarios.filter(elem => elem.cpf == usuario2.cpf);
        var s_usuario3 = allusuarios.filter(elem => elem.cpf == usuario3.cpf);

        var allmusicas : ElementArrayFinder = element.all(by.name('musicaslist'));
        var samemusica = allmusicas.filter(elem => sameID(elem,id));

        var allformacoes : ElementArrayFinder = element.all(by.name('formacoeslist'));
        var sameformacao = allformacoes.filter(elem => elem.musica == samemusica);
        
        sameformacao.associacao[ sameformacao.associacao.find(integrante1) ].find(s_usuario1) != -1;
        sameformacao.associacao[ sameformacao.associacao.find(integrante2) ].find(s_usuario2) != -1;
        sameformacao.associacao[ sameformacao.associacao.find(integrante3) ].find(s_usuario3) != -1;

    }  

    // - - - - - - - - - - - Scenario II - - - - - - - - - - -

    Given(/^eu estou eu estou na pagina de montar a formacao$/, async () => {
        await browser.get("http://localhost:4200/administrador");
        await $("[name='montagemformacao']").click();
    })

    Given(/^existe uma musica com titulo "([^\"]*)", artista "([^\"]*)", integrantes "([^\"]*)", ID "(\d*)" e sem usuarios interessados$/, 
    async (titulo, artista, integrantes, id, usuariosInteressados) => {
        await cadastrarMusica(titulo,artista,integrantes,id);
    })

    When (/^seleciono criar nova formacao/$), async() =>{
        await element(by.id('criarFormacao')).click();
    }   

    Then (/^Then eu não posso ver na lista de formacoes a música de ID "([^\"]*)"/$)
    , async(id) =>{
        var allformacoes : ElementArrayFinder = element.all(by.name('formacoeslist'));
        var sameformacao = allformacoes.filter(elem => elem.musica.id == id).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }  

})
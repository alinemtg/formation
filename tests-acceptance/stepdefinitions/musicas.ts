import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

// FUNCOES

let sameArtista = ((elem, artista) => elem.element(by.name('artistalist')).getText().then(text => text === artista));
let sameTitulo = ((elem, titulo) => elem.element(by.name('titulolist')).getText().then(text => text === titulo));
let sameID = ((elem, id) => elem.element(by.name('idlist')).getText().then(text => text === id));

let pAND = ((p,q,r) => p.then(a => q.then(b => r.then(c => (a && b) && c))))

async function cadastrarMusica(titulo, artista, integrantes, id) {
    await $("input[name='titulobox']").sendKeys(<string> titulo);
    await $("input[name='artistabox']").sendKeys(<string> artista);
    await $("input[name='integrantesbox']").sendKeys(<string> integrantes);
    await $("input[name='idbox']").sendKeys(<string> id);
    await element(by.buttonText('Adicionar')).click();
}

// verifica o tamanho do array de acordo com o parametro n
async function tamanhoIgualA(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

// verifica se existe uma musica cadastrada ou nao de acordo com o titulo, artista e id 
// (0 para saber se não existe, 1 para saber se existe uma e etc)
async function musicasIguais(n,titulo,artista,id) { 
    var allmusicas : ElementArrayFinder = element.all(by.name('musicaslist'));
        var samemusica = allmusicas.filter(elem =>
            pAND(sameArtista(elem,artista),sameTitulo(elem,titulo),sameID(elem,id)));
    await tamanhoIgualA(samemusica,n);
}

// GIVE WHEN E THEN

defineSupportCode(function ({ Given, When, Then }) {

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

    Given(/^eu estou na pagina de cadastro de musica$/, async () => {
        // HOME
        await browser.get("http://localhost:4200/administrador");
        await $("[name='cadastromusica']").click();
    })

    Given(/^nao existe uma musica com titulo “([^\"]*)”, artista “([^\"]*)” e ID "(\d*)" na lista de musicas disponiveis$/, async (titulo, artista, id) => {
        await musicasIguais(0,titulo,artista,id);
    });

    When(/^eu tento cadastrar uma musica com titulo “([^\"]*)”, artista “([^\"]*)”, integrantes “([^\"]*)” e ID "(\d*)"$/, async (titulo, artista, integrantes, id) => {
        await cadastrarMusica(titulo,artista,integrantes,id);
    });

    Then(/^eu posso ver na lista musicas disponiveis a musica com titulo “([^\"]*)”, artista “([^\"]*)” e ID "(\d*)"$/, async (titulo, artista, id) => {
        await musicasIguais(1,titulo,artista,id);
    });

    Given(/^existe uma música com titulo “([^\"]*)”, artista “([^\"]*)”, integrantes “([^\"]*)” e ID "(\d*)" na lista de musicas disponiveis$/, async (titulo, artista, integrantes, id) => {
        await cadastrarMusica(titulo,artista,integrantes,id);
        musicasIguais(1,titulo,artista,id);
    });

    Then(/^eu nao vejo na lista musicas disponiveis a musica com titulo “([^\"]*)”, artista “([^\"]*)” e ID "(\d*)" duplicada$/, async (titulo, artista, id) => {
        musicasIguais(1,titulo,artista,id);
    });

    Then(/^eu nao vejo na lista musicas disponiveis a musica com titulo “([^\"]*)”, artista “([^\"]*)” e ID "(\d*)"$/, async (titulo, artista, id) => {
        musicasIguais(0,titulo,artista,id);
    });

})
Feature: As a lider do grupo
         I want to adicionar musicas colocando seu titulo, artista, integrantes e ID
         So that a musica ira para a lista de “musicas disponiveis” ficando disponivel para montar formacao

Scenario: Cadastro de Musica bem-sucedido
Given eu estou logada como "Rebeca" com CPF "701"
Given eu estou na pagina de cadastro de musica
Given nao existe uma musica com titulo “No Air”, artista “The Boyz” e ID "1" na lista de musicas disponiveis
When eu tento cadastrar uma musica com titulo “No Air”, artista “The Boyz”, integrantes “Sangyeon,Q,Sunwoo,New,Kevin,Eric,Jacob,Hyunjae,Younghoon,Juyeon,Hwall,Haknyeon” e ID "1"
Then eu posso ver na lista musicas disponiveis a musica com titulo “No Air”, artista “The Boyz” e ID "1"

Scenario: Cadastro de Musica duplicada
Given eu estou na pagina de cadastro de musica
Given existe uma música com titulo “Sweet Chaos”, artista “DAY6”, integrantes “Sungjin,Young K,Jae,Wonpil,Dowoon” e ID "6" na lista de musicas disponiveis
When eu tento cadastrar uma musica com titulo “Sweet Chaos”, artista “DAY6”, integrantes “Sungjin,Young K,Jae,Wonpil,Dowoon” e ID "6"
Then eu nao vejo na lista musicas disponiveis a musica com titulo “Sweet Chaos”, artista “DAY6” e ID "6" duplicada

Scenario: Cadastro de Musica com ID ja existente
Given eu estou na pagina de cadastro de musica
Given existe uma música com titulo “Umpah Umpah”, artista “Red Velvet”, integrantes “Irene,Seulgi,Wendy,Joy,Yeri” e ID "5" na lista de musicas disponiveis
When eu tento cadastrar uma musica com titulo “Follow”, artista “Monsta X”, integrantes “Shownu,Wonho,Minhyuk,Kihyun,Hyungwon,Joohoney,I.M” e ID "5"
Then eu nao vejo na lista musicas disponiveis a musica com titulo “Follow”, artista “Monsta X” e ID "5"
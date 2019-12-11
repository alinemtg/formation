Feature: As a lider (ADM) do grupo
         I want to criar formacoes de músicas disponiveis
         So that eu posso associar usuários interessados com integrantes do grupo original

Scenario: Cadastro de Formacao bem-sucedido
Given eu estou na pagina “Montar Formacao”
Given existe uma musica com titulo “Dear Santa”, artista “SNSD TTS”, integrantes “Seohyun, Taeyeon, Tiffany”, ID "13" e usuários interessados "Lhinechuu, Mi e Aninha" 
When eu seleciono "criar nova formacao"
When eu seleciono a música “Dear Santa”
When eu associo “Seohyun" com "Lhinechuu", "Taeyeon" com "Mi" e "Tiffany” com "Aninha"
When seleciono "submeter formacao"
Then eu posso ver na lista “formacoes” a música "Dear Santa" com as associacoes “Seohyun" com "Lhinechuu", "Taeyeon" com "Mi" e "Tiffany” com "Aninha"

Scenario: Cadastro de Formacao impossibilitado
Given eu estou na pagina “Montar Formacao”
Given existe uma musica com titulo “Holololo”, artista “EXO CBX”, integrantes “Baek, Chen, Xiumin”, ID "12" e usuários interessados "" 
When eu seleciono "criar nova formacao"
Then eu não posso ver na lista “formacoes” a música "Holololo", artista “EXO CBX”, ID "12"

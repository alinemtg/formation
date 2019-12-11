Feature: As a lider (ADM) do grupo
         I want to criar formacoes de músicas disponiveis
         So that eu posso associar usuários interessados com integrantes do grupo original

Scenario: Cadastro de Formacao bem-sucedido
Given eu estou logada como "Rebeca" com CPF "701"
Given eu estou na pagina de montagem de formacao
Given existe uma musica com titulo “Dear Santa”, artista “SNSD TTS”, integrantes “Seohyun, Taeyeon, Tiffany”, ID "13" e usuários interessados "Lhinechuu, Mi e Aninha" 
When eu seleciono criar nova formacao
When eu seleciono a música “Dear Santa”
When eu associo os integrantes “Seohyun" , "Taeyeon" e "Tiffany” da música "Dear Santa", id "13", com os usuarios "Lhinechuu", "Mi" e "Aninha", respectivamente
Then seleciono submeter formacao
Then eu posso ver na lista “formacoes” a música "Dear Santa", id "13", com as associacoes “Seohyun" com "Lhinechuu", "Taeyeon" com "Mi" e "Tiffany” com "Aninha"

Scenario: Cadastro de Formacao impossibilitado
Given eu estou na pagina de montar a formacao
Given existe uma musica com titulo “Holololo”, artista “EXO CBX”, integrantes “Baek, Chen, Xiumin”, ID "12" e usuários interessados "" 
When eu seleciono criar nova formacao
Then eu não posso ver na lista “formacoes” a música "Holololo", artista “EXO CBX”, ID "12"

Feature: As a integrante do grupo
         I want to escolher os projetos que tenho interesse em participar
         So that a líder do grupo (ADM) poderá me alocar nas formações que tenho interesse

Scenario: Interesse positivo bem-sucedido
Given estou na página de home logado como “irixs” com o cpf “1234” 
And eu vejo as Músicas Disponíveis “Sweet Crazy Love” sem confirmação, “Deep Blue Eyes” sem confirmação e “Be Natural” sem confirmação
When eu seleciono que tenho interesse em “Deep Blue Eyes”
Then eu estou na página de home e vejo a mensagem “Interesse em Deep Blue Eyes confirmado com sucesso!”
And “Sweet Crazy Love” sem confirmação, “Deep Blue Eyes” confirmado e “Be Natural” sem confirmação.

Scenario: Interesse negativo bem-sucedido
Given estou na página de coleta de interesse logado como “irixs” com o cpf “1234” 
And eu vejo as Músicas Disponíveis “Touch” confirmado, “Love Me Right” sem confirmação e “Blue Orangeade” sem confirmação
When eu seleciono que não tenho interesse em “Touch”
Then eu estou na página de coleta de interesse e vejo a mensagem “Interesse em Touch negado com sucesso!”
And “Touch” sem confirmação, “Love Me Right” sem confirmação e “Blue Orangeade” sem confirmação.
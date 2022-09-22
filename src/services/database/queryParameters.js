export const situacao = `
    CASE idSituacao 
        WHEN 1 
            THEN 'Funcionário Ativo'
        WHEN 2 
            THEN 'Afastamento direitos integrais'
        WHEN 3 
            THEN 'Acid. Trabalho período superior a 15 dias'
        WHEN 4 
            THEN 'Serviço militar'
        WHEN 5 
            THEN 'Licença maternidade'
        WHEN 6 
            THEN 'Doença período superior a 15 dias'
        WHEN 7 
            THEN 'Licença sem vencimento'
        WHEN 8 
            THEN 'Funcionário Desligado'
        WHEN 9 
            THEN 'Férias'
        WHEN 10 
            THEN 'Novo afast. mesmo acid. trabalho'
        WHEN 11 
            THEN 'Prorrogação licença maternidade'
        WHEN 12 
            THEN 'Novo afast. mesma doença'
        WHEN 13 
            THEN 'Exercício de mandato sindical'
        WHEN 14 
            THEN 'Aposent. por invalid. acidente de trabalho'
        WHEN 15 
            THEN 'Aposent. por invalid. doença profissional'
        WHEN 16 
            THEN 'Aposent. por invalid. exceto acid. trab. e doença profissional'
        WHEN 17 
            THEN 'Acid. Trabalho período igual ou inferior a 15 dias'
        WHEN 18 
            THEN 'Doença período igual ou inferior a 15 dias'
        WHEN 19 
            THEN 'Aborto não criminoso'
        WHEN 20 
            THEN 'Licença maternidade por adoção'
        WHEN 21 
            THEN 'Licença maternidade adoção 1 até 4 anos'
        WHEN 22 
            THEN 'Licença maternidade adoção 4 a 8 anos'
        WHEN 23 
            THEN 'Transferido'
        WHEN 24 
            THEN 'Outros motivos de afastamento'
        WHEN 25 
            THEN 'Outros motivos de afastamento'
        WHEN 26 
            THEN 'Prorrogação licença maternidade 60 dias'
        WHEN 27 
            THEN 'Prorrogação licença maternidade 60 dias adoção 1 ano'
        WHEN 28 
            THEN 'Prorrogação licença maternidade 30 dias adoção 1 até 4 anos'
        WHEN 29 
            THEN 'Prorrogação licença maternidade 15 dias adoção 4 até 8 anos'
        WHEN 30 
            THEN 'Recesso do estagiário'
        WHEN 31 
            THEN 'Falecimento do contribuinte'
        WHEN 32 
            THEN 'Licença paternidade'
        WHEN 33 
            THEN 'Afastamento por irregularidade no FGTS'
        WHEN 35 
            THEN 'Cárcere'
        WHEN 36 
            THEN 'Participação de curso ou programa de qualificação'
        WHEN 52 
            THEN 'Periodo Anterior a admissão'
        WHEN 53 
            THEN 'Licença Remunerada Férias'
        WHEN 37 
            THEN 'Acid. Trabalho período superior a 15 dias (Conversão)'
        WHEN 38 
            THEN 'Novo afast. mesmo acid. trabalho (Conversão)'
        WHEN 39 
            THEN 'Ausência justificada'
        WHEN 40 
            THEN 'Encerramento de estágio'
        WHEN 41 
            THEN 'Licença maternidade por morte da genitora'
        WHEN 42 
            THEN 'Acid. Trabalho período superior a 30 dias'
        WHEN 43 
            THEN 'Doença período superior a 30 dias'
        WHEN 44 
            THEN 'Acid. Trabalho período igual ou inferior a 30 dias'
        WHEN 45 
            THEN 'Doença período igual ou inferior a 30 dias'
        WHEN 34 
            THEN 'Suspensão'
        WHEN 48 
            THEN 'Serviço militar com direitos integrais'
        WHEN 49 
            THEN 'Doença profissional igual ou inferior a 15 dias'
        WHEN 50 
            THEN 'Doença profissional superior a 15 dias'
        WHEN 51 
            THEN 'Novo afast. mesma doença profissional'
        WHEN 54 
            THEN 'Doença profissional igual ou inferior a 15 dias FGTS'
        WHEN 55 
            THEN 'Doença profissional superior a 15 dias FGTS'
        WHEN 56 
            THEN 'Novo afast. mesma doença profissional FGTS'
        WHEN 57 
            THEN 'Prorrogação licença paternidade'
        WHEN 47 
            THEN 'Licença Prêmio'
        ELSE 'Indeterminada'
    END AS situacao
`;

export const desligado = `
    CASE 
        WHEN r.demissao IS NULL
            THEN 'N' 
        ELSE 'S' 
    END desligado
`;

export const enderecoTipoLogradouro = `
    CASE e.TIPO_ENDERECO 
        WHEN 45 
            THEN 'AEROPORTO'
        WHEN 2 
            THEN 'Alameda'
        WHEN 46 
            THEN 'ALAMEDA'
        WHEN 3  
            THEN 'Área'
        WHEN 47 
            THEN 'ÁREA'
        WHEN 4  
            THEN 'Avenida'
        WHEN 48 
            THEN 'AVENIDA'
        WHEN 89 
            THEN 'Balneário'
        WHEN 90 
            THEN 'BALNEÁRIO'
        WHEN 91 
            THEN 'Bloco'
        WHEN 92 
            THEN 'BLOCO'
        WHEN 5  
            THEN 'Campo'
        WHEN 49 
            THEN 'CAMPO'
        WHEN 6  
            THEN 'Chácara'
        WHEN 50 
            THEN 'CHÁCARA'
        WHEN 7  
            THEN 'Colônia'
        WHEN 51 
            THEN 'COLÔNIA'
        WHEN 8  
            THEN 'Condomínio'
        WHEN 52 
            THEN 'CONDOMÍNIO'
        WHEN 9  
            THEN 'Conjunto'
        WHEN 53 
            THEN 'CONJUNTO'
        WHEN 10 
            THEN 'Distrito'
        WHEN 54 
            THEN 'DISTRITO'
        WHEN 11 
            THEN 'Esplanada'
        WHEN 55 
            THEN 'ESPLANADA'
        WHEN 12 
            THEN 'Estação'
        WHEN 56 
            THEN 'ESTAÇÃO'
        WHEN 13 
            THEN 'Estrada'
        WHEN 57 
            THEN 'ESTRADA'
        WHEN 14 
            THEN 'Favela'
        WHEN 58 
            THEN 'FAVELA'
        WHEN 15 
            THEN 'Fazenda'
        WHEN 59 
            THEN 'FAZENDA'
        WHEN 16 
            THEN 'Feira'
        WHEN 60 
            THEN 'FEIRA'
        WHEN 93 
            THEN 'Galeria'
        WHEN 94 
            THEN 'GALERIA'
        WHEN 95 
            THEN 'Granja'
        WHEN 96 
            THEN 'GRANJA'
        WHEN 17 
            THEN 'Jardim'
        WHEN 61 
            THEN 'JARDIM'
        WHEN 18 
            THEN 'Ladeira'
        WHEN 62 
            THEN 'LADEIRA'
        WHEN 19 
            THEN 'Lago'
        WHEN 63 
            THEN 'LAGO'
        WHEN 20 
            THEN 'Lagoa'
        WHEN 64 
            THEN 'LAGOA'
        WHEN 21 
            THEN 'Largo'
        WHEN 65 
            THEN 'LARGO'
        WHEN 22 
            THEN 'Loteamento'
        WHEN 66 
            THEN 'LOTEAMENTO'
        WHEN 23 
            THEN 'Morro'
        WHEN 67 
            THEN 'MORRO'
        WHEN 24 
            THEN 'Núcleo'
        WHEN 68 
            THEN 'NÚCLEO'
        WHEN 25 
            THEN 'Parque'
        WHEN 69 
            THEN 'PARQUE'
        WHEN 26 
            THEN 'Passarela'
        WHEN 70 
            THEN 'PASSARELA'
        WHEN 27 
            THEN 'Pátio'
        WHEN 71 
            THEN 'PÁTIO'
        WHEN 28 
            THEN 'Praça'
        WHEN 72 
            THEN 'PRAÇA'
        WHEN 97 
            THEN 'Praia'
        WHEN 98 
            THEN 'PRAIA'
        WHEN 29 
            THEN 'Quadra'
        WHEN 73 
            THEN 'QUADRA'
        WHEN 30 
            THEN 'Recanto'
        WHEN 74 
            THEN 'RECANTO'
        WHEN 31 
            THEN 'Residencial'
        WHEN 75 
            THEN 'RESIDENCIAL'
        WHEN 32 
            THEN 'Rodovia'
        WHEN 76 
            THEN 'RODOVIA'
        WHEN 33 
            THEN 'Rua'
        WHEN 77 
            THEN 'RUA'
        WHEN 34 
            THEN 'Setor'
        WHEN 78 
            THEN 'SETOR'
        WHEN 35 
            THEN 'Sítio'
        WHEN 79 
            THEN 'SÍTIO'
        WHEN 36 
            THEN 'Travessa'
        WHEN 80 
            THEN 'TRAVESSA'
        WHEN 37 
            THEN 'Trecho'
        WHEN 81 
            THEN 'TRECHO'
        WHEN 38 
            THEN 'Trevo'
        WHEN 82 
            THEN 'TREVO'
        WHEN 39 
            THEN 'Vale'
        WHEN 83 
            THEN 'VALE'
        WHEN 40 
            THEN 'Vereda'
        WHEN 84 
            THEN 'VEREDA'
        WHEN 41 
            THEN 'Via'
        WHEN 85 
            THEN 'VIA'
        WHEN 42 
            THEN 'Viaduto'
        WHEN 86 
            THEN 'VIADUTO'
        WHEN 43 
            THEN 'Viela'
        WHEN 87 
            THEN 'VIELA'
        WHEN 44 
            THEN 'Vila'
        WHEN 88 
            THEN 'VILA'
        WHEN 99 
            THEN 'Outro' 
    END AS enderecoTipoLogradouro
`;

export const escolaridade = `
    CASE e.grau_instrucao 
        WHEN 1 
            THEN 'Analfabeto'
        WHEN 2 
            THEN 'Ensino Fundamental 1º ao 5º incompleto'
        WHEN 3 
            THEN 'Ensino Fundamental 1º ao 5º completo'
        WHEN 4 
            THEN 'Ensino Fundamental 6º ao 9º incompleto'
        WHEN 5 
            THEN 'Ensino Fundamental 6º ao 9º completo'
        WHEN 6 
            THEN 'Ensino Médio incompleto'
        WHEN 7 
            THEN 'Ensino Médio completo'
        WHEN 8 
            THEN 'Superior incompleto'
        WHEN 9 
            THEN 'Superior completo'
        WHEN 10 
            THEN 'Mestrado'
        WHEN 11 
            THEN 'Doutorado'
        WHEN 12 
            THEN 'PH. D'
        WHEN 13 
            THEN 'Pós-Graduação' 
    END AS escolaridade
`;

export const estadoCivil = `
    CASE estado_civil
        WHEN 'S' 
            THEN 'Solteiro'
        WHEN 'C' 
            THEN 'Casado'
        WHEN 'V' 
            THEN 'Viúvo'
        WHEN 'D' 
            THEN 'Divorciado'
        WHEN 'O' 
            THEN 'Concubinato'
        WHEN 'J' 
            THEN 'Separado judicialmente'
        WHEN 'U' 
            THEN 'União estável' 
        ELSE 'Não-declarado' 
    END AS estadoCivil
`;

export const sexo = `
    CASE sexo
        WHEN 'F' 
            THEN 'Feminino'
        WHEN 'M' 
            THEN 'Masculino' 
    ELSE 'Outro' 
    END AS sexo  
`;

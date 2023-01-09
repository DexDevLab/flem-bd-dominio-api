import {
  desligado,
  enderecoTipoLogradouro,
  escolaridade,
  estadoCivil,
  sexo,
  situacao,
} from "./queryParameters";

/**
 * Query SQL para receber todos os funcionários do BD Domínio.
 *
 * Colunas:
 *
 * @param {Integer} matriculaDominio Matrícula do funcionário
 * no sistema
 *
 * @param {String} nome Nome do funcionário
 *
 * @param {String} cargo Cargo
 *
 * @param {Integer} codDepto Código do departamento
 *
 * @param {String} departamento Nome do departamento
 *
 * @param {Date} dataNasc Data de nascimento
 *
 * @param {String} sexo Sexo do funcionário, de acordo com seu
 * documento de registro
 *
 * @param {String} estadoCivil Estado Civil do funcionário, de
 * acordo com seu documento de registro
 *
 * @param {Integer} dependentes Número de dependentes familiares
 * do funcionário, sob sua responsabilidade
 *
 * @param {String} naturalidade Naturalidade do registro de nascimento
 *
 * @param {String} ufNascimento UF do registro de nascimento
 *
 * @param {String} cpf CPF
 *
 * @param {String} identidade Registro Geral do documento de identidade
 *
 * @param {String} escolaridade Nível de escolaridade
 *
 * @param {String} email Email de contato
 *
 * @param {String} email_alterativo Email de contato secundário
 *
 * @param {String} pis Registro de PIS/NIS
 *
 * @param {String} cartProf Registro da CTPS
 *
 * @param {String} enderecoTipoLogradouro Tipo de logradouro
 * do endereço
 *
 * @param {String} enderecoCep CEP do endereço
 *
 * @param {String} enderecoLogradouro Logradouro do endereço
 *
 * @param {String} enderecoNumero Número do endereço
 *
 * @param {String} enderecoBairro Bairro do endereço
 *
 * @param {String} enderecoMunicipio Município do endereço
 *
 * @param {String} enderecoUf UF do endereço
 *
 * @param {String} telefone Telefone de contato
 *
 * @param {String} nomePai Nome do pai
 *
 * @param {String} nomeMae Nome da mãe
 *
 * @param {String} nomeConjuge Nome do Cônjuge
 *
 * @param {Date} dataAdmissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {Integer} idSituacao Código da situação contratual
 * do funcionário de acordo com o sistema
 *
 * @param {String} situacao Descrição da situação contratual
 *
 * @param {String} desligado Informa se o funcionário
 * se encontra desligado ("S" para SIM e "N" para NÃO)
 *
 * @param {Date} dataDemissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {String} possuiPlano Informa se o funcionário
 * possui plano de saúde ("S" para SIM e "N" para NÃO)
 *
 * @param {String} possuiPlanoOdonto Informa se o funcionário
 * possui plano odontológico ("S" para SIM e "N" para NÃO)
 *
 * @param {Integer} salario Salário do funcionário
 *
 * @param {String} jornadaTrabalho Descrição da jornada
 * de trabalho
 *
 * @param {String} funcCelular Número de telefone celular
 * corporativo / alternativo
 *
 * @param {Array} filter Filtro com condições para pesquisa
 * detalhada na query
 * @param {Object} queryLimit Define o limite dos resultados para
 * pesquisa na query.
 * @returns {String} Query para execução pelo controller para pesquisa
 * no BD
 */
export function getAllFuncRhDataQuery(filter, queryLimit) {
  return `
        SELECT TOP  ${queryLimit || 3500}

        ROW_NUMBER() OVER(ORDER BY e.i_empregados ASC) AS queryRow,
        e.i_empregados AS matriculaDominio, 
        e.nome AS nome, 
        c.nome AS cargo,
        d.codDepto as codDepto,
        d.departamento AS departamento, 
        e.data_nascimento AS dataNasc,
        ${sexo},
        ${estadoCivil},
        isnull(dep.quantidade, 0) AS dependentes,
        mn.nome_municipio AS naturalidade,
        e.uf_nascimento AS ufNascimento, 
        e.cpf AS cpf, 
        e.identidade AS identidade,
        ${escolaridade},
        e.email AS email, 
        e.email_alternativo AS emailAlternativo, 
        e.pis AS pis,
        (e.cart_prof + e.serie_cart_prof + e.uf_cart_prof) as cartProf,
        ${enderecoTipoLogradouro},
        e.cep AS enderecoCep,
        e.complemento AS enderecoLogradouro,
        e.numero_end AS enderecoNumero,
        e.bairro AS enderecoBairro,
        mns.nome_municipio AS enderecoMunicipio,
        sigla_uf AS enderecoUf,
        ltrim(rtrim(isnull(e.ddd_fone, '') + ' ' +  e.fone)) AS telefone, 
        e.nome_pai AS nomePai,
        e.nome_mae AS nomeMae, 
        e.nome_conjuge AS nomeConjuge,
        e.admissao AS dataAdmissao,
        isnull(a.i_afastamentos, 0) as idSituacao,
        ${situacao},
        ${desligado},
        r.demissao AS dataDemissao,
        pl.possui_plano AS possuiPlano, 
        o.possui_plano AS possuiPlanoOdonto, 
        e.salario AS salario,
        j.descricao_jornada AS jornadaTrabalho,
        (e.ddd_celular + e.celular) AS funcCelular

    FROM [bethadba].[foempregados] AS e

        LEFT JOIN bethadba.gemunicipio AS mn ON (e.MUNICIPIO_NASCIMENTO = mn.codigo_municipio)
        LEFT JOIN bethadba.gemunicipio AS m ON (e.MUNICIPIO_ENDERECO = m.codigo_municipio)
        LEFT JOIN bethadba.geestado AS est_end ON (est_end.codigo_uf = m.codigo_uf)
        LEFT JOIN SRVDOMINIO.Contabil.bethadba.forescisoes r ON (r.i_empregados = e.i_empregados AND r.codi_emp = 1 AND r.tipo = 1)
        
        OUTER APPLY
        (
            SELECT TOP 1
            j.descricao_jornada
            FROM bethadba.fojornadas AS j
            WHERE e.i_jornada = j.i_jornada
        ) AS j


	    OUTER APPLY
        (
            SELECT TOP 1
                i_empregados, 
                i_afastamentos,
                data_real,
                numero_dias
            FROM [bethadba].[foafastamentos] AS a
            WHERE a.codi_emp = 1 AND e.i_empregados = a.i_empregados AND e.i_depto != 1 AND CAST(a.data_real AS date) <= CAST(GETDATE() AS date) 
            ORDER BY a.data_real DESC
        ) AS a

        OUTER APPLY
        (
            SELECT
                codigo_municipio, nome_municipio
            FROM bethadba.gemunicipio AS mns
            WHERE e.i_depto != 1 AND e.municipio_endereco = mns.codigo_municipio
            ORDER BY nome ASC
        ) AS mns

        OUTER APPLY
        (
            SELECT
                i_cargos, 
                nome
            FROM [bethadba].[focargos] AS c
            WHERE e.i_depto != 1 AND c.i_cargos = e.i_cargos AND c.codi_emp = 1
        ) AS c
    
        OUTER APPLY
        (
            SELECT
                CASE 
                    WHEN SUM
                            (
                                CASE 
                                    WHEN (DATA_FIM IS NULL OR CAST(DATA_FIM AS date) >= CAST(GETDATE() AS date)) 
                                        THEN 1
                                            ELSE 0 
                                END
                            ) > 0 
                        THEN 'S' 
                            ELSE 'N' 
                END AS possui_plano
            FROM [bethadba].[FOEMPREGADOS_PLANO_SAUDE] AS pl
            WHERE e.i_empregados = pl.I_EMPREGADOS AND e.i_depto != 1
            AND I_OPERADORAPLANOSAUDE = 1
        ) AS pl

        OUTER APPLY
        (
            SELECT
                CASE 
                    WHEN SUM
                            (
                                CASE 
                                    WHEN (DATA_FIM IS NULL OR CAST(DATA_FIM AS date) >= CAST(GETDATE() as date)) 
                                        THEN 1 
                                            ELSE 0 
                                END
                            ) > 0 
                        THEN 'S' 
                            ELSE 'N' 
                END AS possui_plano
            FROM [bethadba].[FOEMPREGADOS_PLANO_SAUDE] AS o
            WHERE e.i_empregados = o.I_EMPREGADOS AND e.i_depto != 1
            AND I_OPERADORAPLANOSAUDE = 2
        ) AS o

        OUTER APPLY
        (
            SELECT
                count(*) AS quantidade
            FROM [bethadba].[fofilhos] AS dep
            WHERE codi_emp = 1 AND e.i_empregados = dep.i_empregados
        ) AS dep

        OUTER APPLY
        (
            SELECT
                d.nome as departamento,
                d.i_depto as codDepto
            FROM [bethadba].[fodepto] d 
            WHERE d.codi_emp = 1 AND e.i_depto != 1 AND e.i_depto = d.i_depto
            ORDER BY d.nome ASC
        ) AS d

        WHERE CAST(e.admissao AS date) <= CAST(GETDATE() AS date) AND e.codi_emp = 1 AND e.i_depto != 1 AND e.vinculo != 13${
          filter.join("") || ""
        }
    `;
}

/**
 * Query SQL para receber todos os funcionários do BD Domínio,
 * no escopo beneficiários (apenas dados utilizados para validação
 * no Portal PPE).
 *
 * Colunas:
 *
 * @param {Integer} matriculaDominio Matrícula do funcionário
 * no sistema
 *
 * @param {String} nome Nome do funcionário
 *
 * @param {Integer} codDepto Código do departamento
 *
 * @param {String} departamento Nome do departamento
 *
 * @param {String} cpf CPF
 *
 * @param {Date} dataAdmissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {Integer} idSituacao Código da situação contratual
 * do funcionário de acordo com o sistema
 *
 * @param {String} situacao Descrição da situação contratual
 *
 * @param {String} desligado Informa se o funcionário
 * se encontra desligado ("S" para SIM e "N" para NÃO)
 *
 * @param {Date} dataDemissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {Array} filter Filtro com condições para pesquisa
 * detalhada na query
 * @param {Object} queryLimit Define o limite dos resultados para
 * pesquisa na query.
 * @returns {String} Query para execução pelo controller para pesquisa
 * no BD
 */
export function getAllBenefDataQuery(filter, queryLimit) {
  return `
        SELECT TOP  ${queryLimit || 6000}
  
            ROW_NUMBER() OVER(ORDER BY e.i_empregados ASC) AS queryRow,
            e.i_empregados AS matriculaDominio, 
            e.nome AS nome,
            d.codDepto as codDepto,
            d.departamento AS departamento,  
            e.cpf AS cpf,
            e.admissao AS dataAdmissao,
            isnull(a.i_afastamentos, 0) as idSituacao,
            ${situacao},
            ${desligado},
            r.demissao AS dataDemissao

        FROM [bethadba].[foempregados] AS e

            LEFT JOIN SRVDOMINIO.Contabil.bethadba.forescisoes r ON (r.i_empregados = e.i_empregados AND r.codi_emp = 1 AND r.tipo = 1)

            OUTER APPLY
            (
                SELECT TOP 1
                    i_empregados, 
                    i_afastamentos
                FROM [bethadba].[foafastamentos] AS a
                WHERE a.codi_emp = 1 AND e.i_empregados = a.i_empregados AND e.i_depto != 1 AND CAST(a.data_real AS date) <= CAST(GETDATE() AS date) 
                ORDER BY a.data_real DESC
            ) AS a

            OUTER APPLY
            (
                SELECT
                    i_cargos, 
                    nome
                FROM [bethadba].[focargos] AS c
                WHERE e.i_depto != 1 AND c.i_cargos = e.i_cargos AND c.codi_emp = 1
            ) AS c

            OUTER APPLY
            (
                SELECT
                    d.nome as departamento,
                    d.i_depto as codDepto
                FROM [bethadba].[fodepto] d 
                WHERE d.codi_emp = 1 AND e.i_depto != 1 AND e.i_depto = d.i_depto
                ORDER BY d.nome ASC
            ) AS d
  
        WHERE CAST(e.admissao AS date) <= CAST(GETDATE() AS date) AND e.codi_emp = 1 AND e.i_depto != 1 AND e.vinculo != 13${
          filter.join("") || ""
        }
      `;
}

/**
 * Query SQL para listar todos os eventos de afastamento do funcionário,
 * seja por desligamento, férias ou licenças.
 *
 * Colunas:
 *
 * @param {Integer} matriculaDominio Matrícula do funcionário
 * no sistema
 *
 * @param {String} nome Nome do funcionário
 *
 * @param {String} cargo Cargo
 *
 * @param {Integer} codDepto Código do departamento
 *
 * @param {String} departamento Nome do departamento
 *
 * @param {String} cpf CPF
 *
 * @param {Date} dataAdmissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {Integer} idSituacao Código da situação contratual
 * do funcionário de acordo com o sistema
 *
 * @param {String} situacao Descrição da situação contratual
 *
 * @param {String} desligado Informa se o funcionário
 * se encontra desligado ("S" para SIM e "N" para NÃO)
 *
 * @param {Date} dataDemissao Data de Admissão do funcionário
 * no sistema.
 *
 * @param {Date} afastamentoDataReal Data do início de um afastamento
 * específico
 *
 * @param {Date} afastamentoNumDias Quantidade de dias que durou
 * este evento de afastamento
 *
 * @param {String} funcCelular Número de telefone celular
 * corporativo / alternativo
 *
 * @param {Array} filter Filtro com condições para pesquisa
 * detalhada na query
 * @param {Object} queryLimit Define o limite dos resultados para
 * pesquisa na query.
 * @returns {String} Query para execução pelo controller para pesquisa
 * no BD
 */
export function getAllAfastamentosDataQuery(filter, queryLimit) {
  return `
        SELECT TOP  ${queryLimit || 6000}
  
            ROW_NUMBER() OVER(ORDER BY e.i_empregados ASC) AS queryRow,
            e.i_empregados AS matriculaDominio, 
            e.nome AS nome, 
            c.nome AS cargo,
            d.codDepto as codDepto,
            d.departamento AS departamento, 
            e.cpf AS cpf,
            e.admissao AS dataAdmissao,
            isnull(a.i_afastamentos, 0) as idSituacao,
            ${situacao},
            ${desligado},
            r.demissao AS dataDemissao,
            a.data_real AS afastamentoDataReal, 
            a.numero_dias AS afastamentoNumDias
    
        FROM [bethadba].[foempregados] AS e
    
            LEFT JOIN SRVDOMINIO.Contabil.bethadba.forescisoes r ON (r.i_empregados = e.i_empregados AND r.codi_emp = 1 AND r.tipo = 1)
            
            OUTER APPLY
            (
                SELECT
                    i_empregados, 
                    i_afastamentos,
                    data_real,
                    numero_dias
                FROM [bethadba].[foafastamentos] AS a
                WHERE a.codi_emp = 1 AND e.i_empregados = a.i_empregados AND e.i_depto != 1
                ORDER BY nome ASC
            ) AS a
    
            OUTER APPLY
            (
                SELECT
                    i_cargos, 
                    nome
                FROM [bethadba].[focargos] AS c
                WHERE e.i_depto != 1 AND c.i_cargos = e.i_cargos AND c.codi_emp = 1
            ) AS c
        
            OUTER APPLY
            (
                SELECT
                    d.nome as departamento,
                    d.i_depto as codDepto
                FROM [bethadba].[fodepto] d 
                WHERE d.codi_emp = 1 AND e.i_depto != 1 AND e.i_depto = d.i_depto
                ORDER BY d.nome ASC
            ) AS d
  
          WHERE CAST(e.admissao AS date) <= CAST(GETDATE() AS date) AND e.codi_emp = 1 AND e.i_depto != 1 AND e.vinculo != 13${
            filter.join("") || ""
          }
      `;
}

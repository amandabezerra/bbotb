# [BBotB]

O **Big Battle of the Best** é um site de competição onde apenas os melhores sobrevivem.

A cada Round um participante é eliminado por votação pública e no final vamos descobrir quem é o melhor!

## Sobre

O [BBotB] é um projeto experimental criado para estudos de temas como *Component Driven User Interfaces*, *Component Documentation*, *Utility-First CSS* e *Static Site Generation*.

Abaixo você confere como rodar e testar localmente, e também informações sobre quais recursos estão disponíveis.

No final tem uma seção exclusiva de *Próximos passos* onde você pode ver quais as features estarão disponíveis no futuro.

E se quiser conferir o design da aplicação, você pode acessar no Figma [aqui](https://www.figma.com/file/fUmVt4lHXzEAUXL5lYlK5c/%5BBBotB%5D?node-id=0%3A1&t=HsgSIO3QAitXnjS6-1).

### Tecnologias
- [Storybook](https://storybook.js.org/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Redis](https://redis.io/)
- [Redis-om](https://www.npmjs.com/package/redis-om?activeTab=readme)
- [Artillary](https://www.artillery.io/docs)
- [Jest](https://jestjs.io/pt-BR/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Pré-requisitos

- Node.js
- Docker

## Instalação

Clone este repositório na sua máquina.

Instale as dependências do projeto:

```bash
npm install
```

Crie um arquivo `.env.local` e preencha-o com as informações do arquivo `.env.example`. 
Por padrão o projeto roda o banco Redis em `HOST=localhost` e `PORT=6379`, então caso não faça nenhuma alteração nessas configurções, seu arquivo `.env.local` deve ficar assim:

```.env
REDIS_URL=redis://localhost:6379
```

Rode o banco Redis com Docker:

```bash
docker-compose up -d
```

Inicie a aplicação:

```shell
npm run dev
```

Caso queira visualizar uma versão *production-ready* da aplicação, ao invés do comando anterior rode:

```bash
npm run build
```

```bash
npm run start
```

A aplicação web estará disponível em: http://localhost:3000

E a API estará disponível em: http://localhost:3000/api

### Carga de dados inicial

Para inicializar a aplicação com dados válidos, é importante criar os dados dos **Contestants** e pelo menos um **Round**.
Para isso, realize chamadas HTTP seguindo os exemplos abaixo:

```
curl --request POST \
  --url http://localhost:3000/api/contestants \
  --header 'Content-Type: application/json' \
  --data '{
  "contestants": [
    {
      "name": "Gumball Watterson"
    },
    {
      "name": "Banana Joe"
    },
    {
      "name": "Finn the Human"
    },
    {
      "name": "Marceline Abadeer"
    },
    {
      "name": "Amethyst"
    },
    {
      "name": "Connie Maheswaran"
    }
  ]
}'
```

```
curl --request POST \
  --url http://localhost:3000/api/round \
  --header 'Content-Type: application/json' \
  --data '{
  "number": 1,
  "contestantsIds": [
    <CONTESTANT_ID_STRING_1>,
    <CONTESTANT_ID_STRING_2>,
    <CONTESTANT_ID_STRING_3>
  ]
}'
```

Substitua `<CONTESTANT_ID_STRING_*>` por IDs gerados pela criação de **Contestants** na etapa anterior. 

Para consultar os dados criados na base do Redis utilize [Redis CLI](https://redis.io/docs/ui/cli/) ou [RedisInsight](https://redis.com/redis-enterprise/redis-insight/).

Após esta etapa, será possível visualizar uma votação aberta em http://localhost:3000.

Para mais informações sobre o modelo de dados e endpoints disponíveis na aplicação, consulte a seção **API** abaixo.

## Componentes

Esse projeto segue uma abordagem [Component Driven](https://www.componentdriven.org/) e assim os componentes foram criados de forma isolada e então combinados para criar páginas completas.

Para visualizar a documentação desses componentes bem como seus estados de forma isolada, rode a documentação criada com Storybook utilizando o comando abaixo:

```
npm run storybook
```

A documentação estará disponível em: http://localhost:6006/

## API

## Schemas

### Contestant
Representa um participante na competição que pode se tornar uma opção de voto a cada **Round**.
| Atributo     | Tipo         | Required |
| :---         | :---         | :---     | 
| name  | string      | true     |
| bio | string  | false     |

### Round
Representa uma rodada de votações na competição e armazena quais **Contestants** podem ser eliminados.
| Atributo     | Tipo         | Required |
| :---         | :---         | :---     | 
| number  | integer      | true     |
| contestants | Contestant  | true     |

### Vote
Representa a escolha de qual **Contestant** o usuário escolheu eliminar da competição em um dado **Round**.
| Atributo     | Tipo         | Required |
| :---         | :---         | :---     | 
| roundNumber  | integer      | true     |
| contestantId | string uuid  | true     |


### Endpoints
Base URL: http://localhost:3000/api


**POST /contestants**

Descrição: cria os **Contestants** da competição.

Body:
```json
{
	"contestants": [
		  {
		    "name": "Gumball Watterson"
		  },
		  {
		    "name": "Banana Joe"
		  },
		  {
		    "name": "Finn the Human"
		  },
		  {
		    "name": "Marceline Abadeer"
		  },
		  {
		    "name": "Amethyst"
		  },
		  {
		    "name": "Connie Maheswaran"
		  }
		]
}
```

**POST /round**

Descrição: cria um **Round**.

Body:
```json
{
	"number": 1,
	"contestantsIds": ["497f6eca-6276-4993-bfeb-53cbbbba6f08", "32f47f70-a019-4b6a-aff9-00d8e07c1ad4", "b463dac3-546a-4571-abc9-6df461ef90e5"]
}
```

**GET /votes?roundNumber=1**

Descrição: retorna as estatísticas das votações de um **Round** pelo seu número.

Response:

```json
{
  "roundNumber": 1,
  "total": 7876,
  "totalPerHour": 3938,
  "totalPerContestant": {
    "497f6eca-6276-4993-bfeb-53cbbbba6f08": 4,
    "b463dac3-546a-4571-abc9-6df461ef90e5": 2,
    "32f47f70-a019-4b6a-aff9-00d8e07c1ad4": 1,
    "330619bc-d1f0-433d-9d70-8cbb641688a6": 2703,
    "40b8a0d6-9902-4245-9a31-5045e72dd46c": 2604,
    "842255e6-b6c1-461e-b0d7-f0d105fa482f": 2562
  }
}
```

**POST /vote**

Descrição: registra um voto em um **Contestant**.

Body:
```json
{
  "roundNumber": 1,
  "contestantId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

## Testes

### Testes de Carga

Importante: para realizar os testes de carga, é necessário que a aplicação e o banco de dados estejam rodando, para isso, execute os passos indicados na seção **Instalação** acima.

Em seguida, preencha o arquivo `tests/load/contestants.csv` com IDs de Contestants gerados na seção **Carga de dados inicial** acima. Por exemplo:

```csv
842255e6-b6c1-461e-b0d7-f0d105fa482f
40b8a0d6-9902-4245-9a31-5045e72dd46c
330619bc-d1f0-433d-9d70-8cbb641688a6
```

Esses IDs serão utilizados nas requisições HTTP geradas pelo o Artillary.

Caso deseje modificar as configurações de teste de carga edite o arquivo `tests/load/votes.yml`. 

Por fim, para executar os testes e visualizar os resultados no terminal, rode o comando:

```bash
npm run tests:load
```

Para mais informações sobre configurações de teste, acesse a  [documentação do Artillery](https://www.artillery.io/docs).

### Testes Unitários

Para executar os testes unitários rode o seguinte comando:

```bash
npm run tests:unit
```

## Próximos passos

### Registrar votos na API

A ação de votar do usuário deveria disparar uma chamada para a API para então registrar o voto no banco de dados.

Realizar implementações necessárias para registrar os votos.

### Criar página de carregamento prevista no design

O design da aplicação prevê uma página inicial de carregamento.

Implementar conforme [design](https://www.figma.com/file/fUmVt4lHXzEAUXL5lYlK5c/%5BBBotB%5D?node-id=0%3A1&t=HsgSIO3QAitXnjS6-1).

### Criar página de 404 prevista no design

Caso o usuário acesse uma rota não existente é apresentada a página 404 padrão criada pelo Next.js.

Criar página 404 customizada conforme [design](https://www.figma.com/file/fUmVt4lHXzEAUXL5lYlK5c/%5BBBotB%5D?node-id=0%3A1&t=HsgSIO3QAitXnjS6-1) da aplicação.

Para mais informaçõe sobre páginas de erro customizadas, visitar a [documentação do Next.js](https://nextjs.org/docs/advanced-features/custom-error-page).

### Criar página de estatísticas

Os cálculos de estatísticas bem como os endpoints para acessá-los já estão prontos.

O próximo passo seria criar layout e página exclusiva para esses dados.

### Mostrar ao usuário a parcial de votos atualizadas

Atualmente a porcentagem de votos para cada participante que é apresentada ao usuário após a confirmação de seu voto não leva em conta o próprio voto do usuário, pois são dados pré-carregados na criação da página.

O próximo passo seria criar forma de buscar as estatísticas de voto atualizadas após o registro do voto do usuário.

### Melhorar carregamento de imagens por opção

Atualmente a informação de qual imagem pertence a qual opção de voto não é armazenada no banco de dados, o que pode levar a erros como carregar a imagem errada para uma dada opção de voto.

Avaliar e implementar uma melhor abordagem para o carregamento de imagens por opção.

### Melhorar performance da API

Atualmente é possível avaliar a performance da API através de testes de carga utilizando o [Artillery](https://www.artillery.io/docs) (para mais informações, consultar seção **Testes > Testes de Carga** acima).

Melhorar performance da API com objetivo de alcançar uma baseline de 1000 votos/seg.

### Simplificar processo de inicialização da aplicação

São necessários alguns passos até conseguir rodar a aplicação com dados válidos (rodar container, realizar chamadas HTTP, etc), é interessante criar uma forma de realizar esses passos de uma vez só, de forma mais simples.

Considerar usar ferramentas como Make.

### Melhorar testes da aplicação

As ferramentas de teste já integradas na aplicação oferecem várias abordagens de teste.

Analisar e implementar melhores opções. Sugestões: testes de acessibilidade com [Storybook](https://storybook.js.org/docs/react/writing-tests/accessibility-testing) e testes end-to-end com [Playwright e Storybook](https://storybook.js.org/docs/react/writing-tests/interaction-testing) ou [Cypress](https://www.cypress.io/).

### Criar configurações de produção

### Integrar ferramentas de análise estática de estilo de código


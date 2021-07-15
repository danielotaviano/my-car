<h2 style="text-align: center;" width="100%" align="center">
  My Car
</h2>





  <a  href="https://www.github.com/danielotaviano" style="margin: auto;">
    <img align="center" alt="Feito por Daniel" src="https://img.shields.io/badge/feito%20por-Daniel Otaviano-%237519C1">
  </a>

## My Car - Back-end 🚪
O My Car é uma API REST feita seguindo o Clean Architecture e os principios do SOLID.###

### Funcionalidades ✔️

- [x] -   Carros (`GET`,  `POST`,  `PUT`,  `DELETE`, `LIST`)
- [x] -   Seleção de filtros na listagem do carro. É possível pesquisar por cada atributo do carro e poder ter range de ano e preço.


#### Tecnologias utilizadas 💻

- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Express](https://expressjs.com/pt-br/)


#### Principais Packages 📦
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest  🃏](https://jestjs.io/)

#### Aprendizados do projeto 🔥

- Aumentei meu conhecimento trabalhando com [MongoDB](https://www.mongodb.com/pt-br).

###  Como executar o projeto 🚀

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/).
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/danielotaviano/my-car

# Acesse a pasta do projeto no terminal/cmd
$ cd my-car

# Instale as dependências
## Com Yarn
$ yarn

## Com Npm
$ npm install

# Configure sua .env
## Junto do projeto, vem um arquivo .env.example
## Lá vai está descritas todas as variaveis ambientes que terá que ter no seu .env!
## Obs: Certifique-se que seu banco de dados está em pé antes de rodar a aplicação

##O projeto possui uma pasta do docker-compose para subir o MONGODB em um container.
## É preciso ter o Docker e o docker-compose instalado na sua maquina.
$ sudo docker-compose up -d


# Execute a aplicação em modo de desenvolvimento
## Yarn
$ yarn start:dev

## Npm
$ npm run start:dev

# O servidor inciará na porta configurada no .env
# Sua URL base será http://localhost:PORT

```

## Rotas e Endpoints 👾

#### [ 📝 Carros](./endpoints/carros.md)

## Testes 🧪


| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)    |

### Demo Live 🔴
`URL Base: https://my-car-app-demo.herokuapp.com`
##### O Servidor e o Database estão hospedados gratuitamente nos respectivos serviços:
- [Heroku](https://dashboard.heroku.com/)
- [MongoDBCloud](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=0618htermsCONT&utm_source=google&utm_campaign=gs_americas_brazil_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624308&gclid=Cj0KCQjwub-HBhCyARIsAPctr7ylMjmQiG3nfhubdtOrt7bpTud1PbwUgxMjvin1JPnI-c6lT5-xVQsaAqd1EALw_wcB)


`Obs: Tanto o banco de dados como a api está hospedados em serviços gratuitos e pode sofrer instabilidades.`

##### Qualquer problema, pode falar comigo por estes meios:
- [LinkedIn](https://www.linkedin.com/in/daniel-otaviano/)
- [Twitter](https://twitter.com/danigolkrai)

## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---


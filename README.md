# API de Reservas/Agendamentos

## Descrição do Projeto
A API de Reservas/Agendamentos permite o cadastro e login de usuários, tanto clientes quanto provedores de serviços de beleza que é o foco dos tipos de serviços que podem ter horários agendados, como cabeleireiros, manicures, e outros. Desenvolvida utilizando Node.js, Prisma ORM, Typescript, Express, Docker Compose e PostgreSQL, esta API oferece uma solução robusta e escalável para gerenciar reservas e agendamentos.

## Por que Construímos esta API?
Desenvolvi esta API para colocar em prática meu conhecimento e para atender a uma necessidade específica do mercado local em controlar o agendamento de horários dos serviços de beleza. Esta plataforma visa facilitar a organização e gerenciamento de horários para ambos os prestadores de serviços e seus clientes.

## Tecnologias Utilizadas
- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
- [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/pt-br/)
- [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Implantação
O deploy desta aplicação foi realizado na plataforma Render. Embora esta plataforma tenha suas limitações em seu plano gratuito, é uma escolha viável para projetos pessoais, como este. Na Render, configurei a implantação do banco de dados PostgreSQL e da própria aplicação. É importante ressaltar que, na instância gratuita da Render, pode ocorrer inatividade, o que pode resultar em atrasos nas solicitações de até 50 segundos ou mais.

## Documentação da API
A documentação da API foi elaborada utilizando o Swagger, o que permite testar todas as rotas desenvolvidas de forma simples e eficiente. Você pode acessar a documentação da API [aqui](https://reservation-api-305u.onrender.com/api-docs/).

## Instrução de instalação

### Pré-requisitos
- Node.js 20 ou mais atual

Crie um arquivo `.env` na raiz do projeto com os seguintes campos:
```plaintext
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:port/reservations?schema=public"
TOKEN_KEY=""
```

Certifique-se de substituir USERNAME e PASSWORD pelos seus dados de acesso ao PostgreSQL, assim como a port e o nome do database depois da port.

Mude também no arquivo docker-compose a porta de acesso com a que achar mais acessível nos eu caso, o user e password do seu postgresql.
```plaintext
ports:
      - "5435:5432"
    container_name: "db-postgres-reservation"
      POSTGRES_USER: "nome"
      POSTGRES_PASSWORD: "senha"
```

## Códigos de Execução
### Execute os seguintes comandos:

```bash
yarn 
```
### Para iniciar o banco de dados, utilize o Docker Compose:

```bash
docker compose up
```
### comando para criar e aplicar migrações ao banco de dados:

```bash
npx prisma migrate dev
```
### Para iniciar a aplicação:

```bash 
yarn start
```
Isso iniciará a API de Reservas/Agendamentos e estará pronta para uso no seu ambiente de desenvolvimento 😄.

## Instrução de Uso

- A aplicação estará no localhost:3001 definido no app.listen da index.ts;
- utilize http://localhost:3001/docs para ver a documentação do redoc com swagger;
- utilize http://localhost:3001/api-docs para ver a documentação do swagger;
- Você pode utilizar um insomnia ou postman para testar todas as rotas da aplicação que estão na pasta routes;

## Contato

Qualquer dúvida ou sugestão podem entrar em contato comigo: 

<p>
    <img src="https://avatars.githubusercontent.com/u/87199965?v=4" width="100px;" alt="Foto do Kauê Ronald no GitHub"/><br>
      <sub>
        <b>Kauê Ronald</b>
        </br>
        <b>Desenvolvedor FullStack</b> 
      </sub>
</p> 

Email: kaueronald21.kr@gmail.com <br/>
[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kaueronald.vercel.app/) <br/>
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/kaueronald_/) <br/>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaueronald/) <br/>

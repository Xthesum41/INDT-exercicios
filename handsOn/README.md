# API Mundo Geek

API RESTful para gerenciamento de Categorias e Produtos da loja **Mundo Geek**.

## Arquitetura da solução
### Diagrama (simplificado)

Cliente -> Rotas -> Controllers (-> Middlewares (Zod, ErrorHandler))-> Services (-> Entidades) -> Repositórios (TypeORM) -> PostgreSQL


### Camadas e responsabilidades
- **routes**: define endpoints e encadeia middlewares.
- **middlewares**: validação com Zod e tratamento centralizado de erros.
- **controllers**: recebe request/response e delega para o service.
- **services**: regra de negócio e orquestração de persistência.
- **entities**: mapeamento das tabelas e relacionamento 1:N (Categoria -> Produtos).
- **database**: configuração do DataSource do TypeORM.
- **validates**: schemas Zod para body e params.

## Decisões de design
- **TypeORM + DataSource**: centraliza a conexão e padroniza acesso ao banco.
- **Zod no middleware**: valida dados antes do controller, evitando lógica duplicada.
- **AppError + ErrorHandler**: padroniza respostas de erro com status HTTP.
- **Relacionamento 1:N**: Categoria possui muitos Produtos, Produto pertence a uma Categoria.

## Divisão de responsabilidades (aplicação de boas práticas)
- Cada camada tem foco único e testável.
- Controllers não acessam o banco diretamente; apenas chamam services.
- Services concentram regras de negócio e validações de domínio.
- Entidades representam o estado persistido e o relacionamento entre dados.

## Configuração e execução local
1. Crie um banco PostgreSQL chamado `mundo_geek` (ou ajuste no .env).
2. configure as credenciais em .env.
3. Instale dependências: npm install
4. Rode em dev: npm run dev

## Rotas principais
- **Categorias**
  - POST /categorias
  - GET /categorias
  - GET /categorias/:id
  - PUT /categorias/:id
  - DELETE /categorias/:id

- **Produtos**
  - POST /produtos
  - GET /produtos
  - GET /produtos/:id
  - PUT /produtos/:id
  - DELETE /produtos/:id

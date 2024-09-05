### Instalação

1. Clone o repositório:

    ```shell
    git clone https://github.com/fabricio-p-viana/api-login.git
    ```

2. Instale as dependências:

    ```shell
    npm install
    ```

### Configuração do Banco de Dados

1. Crie o banco de dados:

    ```shell
    npx sequelize-cli db:create
    ```

2. Execute as migrações do banco de dados:

    ```shell
    npx sequelize-cli db:migrate
    ```

### Compilar e Executar

1. Compile os arquivos TypeScript:

    ```shell
    npx tsc
    ```

2. Inicie o servidor de desenvolvimento:

    ```shell
    npx ts-node-dev src/server.ts
    ```

### Uso

Uma vez que o servidor estiver em execução, você pode acessar a API em `http://localhost:3000`.


# Modelo Entidade-Relacionamento (MER)

## Entidades e Atributos

### User
- **id** (PK)
- **name**
- **email**
- **password**
- **role**

# configure o .env

## Variaveis para conexão com o banco de dados
DATABASE_URL=

## URL para frontend
FRONTEND_URL=http://localhost:3000

## Variaveis para autenticação JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

## Variaveis para envio de redefinição de email
EMAIL_USER=
EMAIL_PASS=

## Variaveis para conexão com o banco de dados
DB_NAME=database_development
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=127.0.0.1
DB_DIALECT=postgres
PORT=3000
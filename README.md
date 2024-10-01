
# Controles Lógicos - Roadmap do Projeto

## Descrição

Este projeto é uma aplicação de lista de tarefas construída com Node.js, Express, EJS e SQLite. O objetivo é fornecer uma interface simples para adicionar e visualizar tarefas.

## Funcionalidades

- **Adicionar Tarefas**: Os usuários podem adicionar novas tarefas à lista.
- **Visualizar Tarefas**: A lista de tarefas é exibida na página inicial.
- **Proteção CSRF**: Implementação de proteção contra CSRF (Cross-Site Request Forgery) usando o middleware `csurf`.
- **Segurança**: Utilização do `helmet` para proteger a aplicação de vulnerabilidades comuns.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para construção de aplicações web.
- **EJS**: Mecanismo de visualização para renderizar HTML dinâmico.
- **SQLite**: Banco de dados leve para armazenamento de dados.
- **Body-Parser**: Middleware para analisar dados do corpo das requisições.
- **Express-Session**: Middleware para gerenciar sessões.
- **CSRF**: Proteção contra ataques CSRF.
- **Helmet**: Middleware para aumentar a segurança da aplicação.

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório**:

   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   cd controleslogicos
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor**:

   ```bash
   node app.js
   ```

4. **Acesse a aplicação**: Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
controleslogicos/
├── node_modules/      # Dependências do projeto
├── database.js        # Configuração do banco de dados SQLite
├── app.js             # Arquivo principal da aplicação
├── package.json       # Gerenciador de dependências
└── views/             # Contém os arquivos de visualização EJS
    └── index.ejs     # Template para a página inicial
```

## Roadmap Futuro

- [ ] Adicionar autenticação de usuário.
- [ ] Implementar funcionalidade de edição e exclusão de tarefas.
- [ ] Criar uma API REST para permitir o acesso a tarefas por meio de requisições AJAX.
- [ ] Implementar armazenamento em um banco de dados persistente (não em memória).
- [ ] Melhorar a interface do usuário com frameworks de CSS.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença ISC. Consulte o arquivo LICENSE para mais detalhes.

# Protegendo Aplicações JavaScript

## 1. SQL Injection
Embora o JavaScript em si não interaja diretamente com bancos de dados SQL, aplicações Node.js frequentemente utilizam bibliotecas como `mysql` ou `sequelize` para esse propósito. Para prevenir SQL Injection:

### Soluções Manuais:
- **Utilize consultas parametrizadas:** Evite concatenar strings para formar consultas SQL. Use placeholders e parâmetros.
  ```javascript
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) throw error;
    console.log(results);
  });

Bibliotecas:
Sequelize ORM: Um ORM que abstrai a construção de consultas SQL, reduzindo o risco de SQL Injection.
JavaScript

User.findOne({ where: { id: userId } })
  .then(user => console.log(user))
  .catch(error => console.error(error));

## 2. Cross-Site Scripting (XSS)
XSS ocorre quando scripts maliciosos são injetados em páginas web. Para prevenir XSS:

### Soluções Manuais:
- **Escape de dados: Sempre escape dados antes de renderizá-los no HTML.
JavaScript
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

Bibliotecas:
DOMPurify: Uma biblioteca que sanitiza HTML para prevenir XSS.
JavaScript

const DOMPurify = require('dompurify');
const cleanHtml = DOMPurify.sanitize(dirtyHtml);

## 3. Cross-Site Request Forgery (CSRF)
- **CSRF ocorre quando um atacante faz com que um usuário autenticado execute ações indesejadas. Para prevenir CSRF:

### Soluções Manuais:
Tokens CSRF: Gere e valide tokens CSRF para cada requisição que modifica dados.
JavaScript

const csrfToken = generateCsrfToken();
app.post('/update', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).send('CSRF token mismatch');
  }
  // Process the request
});

Bibliotecas:
csurf: Middleware para Express.js que adiciona proteção CSRF.
JavaScript

const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

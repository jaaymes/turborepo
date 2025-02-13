# Turborepo Monorepo

Este repositório é um monorepo gerenciado com Turborepo, contendo múltiplos aplicativos e pacotes. A estrutura do projeto é a seguinte:

- **apps/storybook**: Aplicativo para documentação de componentes.
- **apps/web**: Aplicativo frontend utilizando Next.js.
- **packages/eslint-config**: Configuração compartilhada do ESLint.
- **packages/typescript-config**: Configuração compartilhada do TypeScript.
- **packages/ui**: Biblioteca de componentes UI.
- **scripts/ai-commit.mjs**: Script para gerar mensagens de commit utilizando IA.

## Pré-requisitos

- Node.js >= 20
- pnpm 10.2.0

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd turborepo
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

## Scripts Disponíveis

Os scripts podem ser executados usando o comando `pnpm <script>`:

- `build`: Compila todos os pacotes e aplicativos.
- `build:storybook`: Compila o aplicativo Storybook.
- `start`: Inicia o aplicativo web.
- `dev`: Inicia o ambiente de desenvolvimento.
- `lint`: Executa o linter em todo o projeto.
- `format`: Formata o código usando Prettier.
- `clean`: Limpa os artefatos de build e `node_modules`.
- `add:ui`: Adiciona dependências ao pacote `ui`.
- `add:web`: Adiciona dependências ao aplicativo `web`.
- `cypress`: Executa testes E2E no aplicativo web.
- `test`: Executa testes unitários.
- `cz`: Gera mensagens de commit usando IA.

## Executando o Projeto

### Aplicativo Web
Para iniciar o aplicativo web, execute:
### Iniciar o aplicativo web em modo de desenvolvimento

```bash
pnpm dev --filter=web
```

### Iniciar o aplicativo web em modo de produção
```bash
pnpm start --filter=web
```

### Aplicativo Storybook
Para iniciar o aplicativo Storybook, execute:
### Iniciar o aplicativo Storybook em modo de desenvolvimento

```bash
pnpm dev --filter=storybook
```

### Iniciar o aplicativo Storybook em modo de produção
```bash
pnpm build:storybook
pnpm start:storybook
```

## Configuração do AI Commit

O projeto utiliza o script `cz` para gerar mensagens de commit. Para configurar o commit, execute:
depois de adicionado os arquivos para commit, execute: Ex: `git add .`

Execute o script, ele iniciará um processo de geração de commit message com a IA, que poderá ser com Gemini ou Ollama. verifique o .env.example para configurar o AI_PROVIDER e o MODEL_NAME.

### Executar o script
```bash
pnpm cz
```

## Configuração de Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo `.env` conforme necessário, especialmente as chaves de API para o provedor de IA.

## Contribuição

Sinta-se à vontade para abrir issues e pull requests. Para contribuições significativas, por favor, discuta as mudanças primeiro através de uma issue.

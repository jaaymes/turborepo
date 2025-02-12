 const config = {
  types: [
    { value: "feat", name: "feat:     ✨ Uma nova feature" },
    { value: "fix", name: "fix:      🐛 Correção de bug" },
    { value: "docs", name: "docs:     📚 Alterações na documentação" },
    {
      value: "style",
      name: "style:    💄 Alterações que não afetam o significado do código",
    },
    { value: "refactor", name: "refactor: ♻️  Refatoração do código" },
    { value: "perf", name: "perf:     ⚡️ Melhorias de performance" },
    { value: "test", name: "test:     ✅ Adicionando testes" },
    {
      value: "chore",
      name: "chore:    🔧 Alterações em arquivos de configuração",
    },
    { value: "ci", name: "ci:       👷 Alterações na configuração do CI" },
    {
      value: "build",
      name: "build:    📦 Alterações que afetam o sistema de build",
    },
  ],

  scopes: [
    { name: "web" },
    { name: "ui" },
    { name: "config" },
    { name: "deps" },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  skipQuestions: ["footer"],

  messages: {
    type: "Qual o tipo de alteração você está fazendo?",
    scope: "Qual o escopo desta alteração (opcional):",
    customScope: "Qual o escopo desta alteração?",
    subject: "Escreva uma descrição curta e imperativa da mudança:\n",
    body: 'Forneça uma descrição mais detalhada da mudança (opcional). Use "|" para quebra de linha:\n',
    breaking: "Liste as breaking changes (opcional):\n",
    confirmCommit: "Tem certeza que quer prosseguir com o commit acima?",
  },

  subjectLimit: 100,
  upperCaseSubject: false,
}

export default config;
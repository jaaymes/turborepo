import chalk from "chalk";
import { exec, spawn } from "child_process";
import dotenv from "dotenv";
import fs, { readFileSync } from "fs";
import inquirer from "inquirer";
import fetch from "node-fetch";
import ora from "ora";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis do .env
dotenv.config({ path: join(__dirname, "../.env") });

const czConfig = JSON.parse(
  readFileSync(join(__dirname, "./config.json"), "utf8")
);

// 🔧 Configuração da IA (futuramente pode ser movida para .env)
const AI_PROVIDER = process.env.AI_PROVIDER || "ollama";
const MODEL_NAME = process.env.MODEL_NAME; // Modelo para Gemini ou Ollama

// 🔄 Configuração do Gemini (substitua pela sua chave de API)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ⚠️ Coloque sua chave da API do Gemini

export function generateCommitMessage(diff) {
  return new Promise((resolve, reject) => {
    const spinner = ora({
      text: chalk.blue("Gerando mensagem de commit..."),
      color: "cyan",
    }).start();

    if (AI_PROVIDER === "ollama") {
      const prompt = `
    <|begin_of_text|>
    <|start_header_id|>system<|end_header_id|>
    Você é um gerador de mensagens de commit.
    

    <|eot_id|>
    Gere uma mensagem de commit clara e concisa para as seguintes alterações no código.
    
    **Requisitos:**
    - A mensagem deve estar em português brasileiro.
    - Utilize a estrutura do Conventional Commits.

    **Alterações no código:**  
    <|eot_id|>
    <|start_header_id|>user<|end_header_id|>
    ${diff}
    <|eot_id|>
    <|start_header_id|>assistant<|end_header_id|>
`;

      // 🧠 Gerar commit message com Ollama
      const process = spawn("ollama", ["run", MODEL_NAME], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";
      let errorOutput = "";

      process.stdin.write(prompt + "\n");
      process.stdin.end();

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", (code) => {
        spinner.stop();
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`Erro no Ollama (código ${code}): ${errorOutput}`));
        }
      });
    } else if (AI_PROVIDER === "gemini") {
      const promptGemini = `Gere uma mensagem de commit clara e objetiva para a seguinte alteração no código.  
    ⚠️ **IMPORTANTE:**  
    - Responda **somente** em **português (pt-BR)**.  
    - Use a estrutura do **Conventional Commits**. 

      ### 🔍 Alterações no código:  ${diff}
    `;
      //🧠 Gerar commit message com Gemini
      fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptGemini,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200,
            },
          }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro na API: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          spinner.stop();
          if (data?.candidates?.length) {
            const message = data.candidates[0].content.parts[0].text.trim();
            resolve(message);
          } else {
            reject(new Error(`Erro no Gemini: ${JSON.stringify(data)}`));
          }
        })
        .catch((err) => {
          spinner.stop();
          reject(new Error(`Erro ao chamar Gemini: ${err.message}`));
        });
    } else {
      spinner.stop();
      reject(new Error("Provedor de IA inválido. Use 'ollama' ou 'gemini'."));
    }
  });
}

export function getGitDiff() {
  return new Promise((resolve, reject) => {
    exec("git diff --cached", (error, stdout, stderr) => {
      if (error) {
        reject(
          new Error(`Erro ao obter o diff do Git: ${stderr || error.message}`)
        );
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function promptCommitType() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Escolha o tipo de commit:",
      choices: czConfig.types.map((type) => ({
        name: type.name,
        value: type.value,
      })),
    },
  ]);
  return type;
}

async function promptScope() {
  const { scope } = await inquirer.prompt([
    {
      type: "list",
      name: "scope",
      message: "Escolha o escopo:",
      choices: [
        ...czConfig.scopes.map((scope) => ({
          name: scope.name,
          value: scope.name,
        })),
      ],
    },
  ]);

  if (scope === "custom") {
    const { customScope } = await inquirer.prompt([
      {
        type: "input",
        name: "customScope",
        message: "Digite o escopo personalizado:",
      },
    ]);
    return customScope;
  }

  return scope;
}

async function main() {
  try {
    const diff = await getGitDiff();
    if (!diff) {
      console.log(chalk.yellow("Nenhuma alteração preparada para commit."));
      return;
    }

    const type = await promptCommitType();
    if (!type) {
      console.log(chalk.red("Tipo de commit inválido."));
      return;
    }

    const scope = await promptScope();
    const aiMessage = await generateCommitMessage(diff);

    // Formatar a mensagem final do commit
    const scopeStr = scope ? `(${scope})` : "";
    const commitMessage = `${type}${scopeStr}: ${aiMessage}`;

    console.log(chalk.green.bold("\nMensagem de commit gerada:\n"));
    console.log(chalk.cyan(commitMessage) + "\n");

    const { confirm } = await inquirer.prompt([
      {
        type: "list",
        name: "confirm",
        message: "Deseja usar essa mensagem?",
        choices: [
          { name: "Sim", value: "yes" },
          { name: "Não, editar no Vim", value: "edit" },
          { name: "Cancelar e abandonar", value: "cancel" },
        ],
        default: "yes",
      },
    ]);

    if (confirm === "yes") {
      // Executa os testes e o lint antes do commit
      console.log(chalk.blue("\nExecutando testes e verificação de código..."));

      const testProcess = exec("pnpm test && pnpm lint");

      testProcess.stdout.on("data", (data) => {
        console.log(chalk.white(data.toString()));
      });

      testProcess.stderr.on("data", (data) => {
        console.error(chalk.red(data.toString()));
      });

      testProcess.on("close", (code) => {
        if (code !== 0) {
          console.error(chalk.red("Falha nos testes ou lint."));
          return;
        }

        // Se os testes e lint passaram, realiza o commit
        exec(
          `git commit -m "${commitMessage.replace(/"/g, '\\"').replace(/`/g, "\\`")}"`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(
                chalk.red(`Erro ao realizar commit: ${stderr || error.message}`)
              );
              return;
            }
            console.log(chalk.green("\n✓ Testes e lint passaram"));
            console.log(chalk.green(stdout));
          }
        );
      });
    } else if (confirm === "edit") {
      // Abre o Vim para editar a mensagem de commit
      const tempFilePath = "/tmp/commit_message.txt";

      // Escreve a mensagem gerada em um arquivo temporário
      fs.writeFileSync(tempFilePath, commitMessage);

      // Abre o Vim para editar a mensagem
      const vimProcess = spawn("vim", [tempFilePath], { stdio: "inherit" });

      vimProcess.on("exit", (code) => {
        if (code !== 0) {
          console.log(chalk.red("Edição da mensagem de commit cancelada."));
          return;
        }

        // Lê a mensagem editada
        const editedMessage = fs.readFileSync(tempFilePath, "utf8").trim();

        // Realiza o commit com a mensagem editada
        exec(
          `git commit -m ${JSON.stringify(editedMessage)}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(
                chalk.red(`Erro ao realizar commit: ${stderr || error.message}`)
              );
              return;
            }
            console.log(
              chalk.green("\n✓ Commit realizado com a mensagem editada")
            );
            console.log(chalk.green(stdout));
          }
        );
      });
    } else if (confirm === "cancel") {
      console.log(chalk.yellow("Commit cancelado e abandonado."));
      return;
    }
  } catch (error) {
    console.error(chalk.red(`Erro: ${error.message}`));
  }
}

main();

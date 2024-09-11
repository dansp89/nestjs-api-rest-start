const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

// Função para criar o arquivo .project.dsp se não existir
function createIgnoreFile() {
    const ignoreFile = '.project.ignore';
    if (!fs.existsSync(ignoreFile)) {
        fs.writeFileSync(ignoreFile, '', 'utf8');
        console.log(`${ignoreFile} criado.`);
    }
}

// Função para ler o arquivo .project.ignore e obter as regras de exclusão
function getIgnoreRules() {
    const ignoreFile = '.project.ignore';
    return fs.readFileSync(ignoreFile, 'utf8').split('\n').filter(Boolean);
}

// Função para listar os arquivos e diretórios
function listFiles(dir, ig, result = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(process.cwd(), fullPath);

        if (ig.ignores(relativePath)) {
            return;
        }

        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            listFiles(fullPath, ig, result);
        } else {
            result.push(fullPath);
        }
    });

    return result;
}

// Função principal
function scanProject() {
    createIgnoreFile();

    const ignoreRules = getIgnoreRules();
    const ig = ignore().add(ignoreRules);

    const files = listFiles(process.cwd(), ig);
    const outputFile = '.project.txt';

    // Cria o arquivo .project.txt ou limpa o conteúdo se já existir
    fs.writeFileSync(outputFile, '', 'utf8');

    let outputData = '';

    files.forEach(filePath => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        outputData += `@file: ${filePath}\n${fileContent}\n`;
    });

    fs.writeFileSync(outputFile, outputData, 'utf8');
    console.log(`Arquivos salvos em ${outputFile}`);
}

// Executa o script
scanProject();
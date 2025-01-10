# Cypress, do Zero à Nuvem
Projeto exemplo do curso "Cypress, do Zero à Nuvem" da escola Talking About Testing.

## Pré-requisitos
Você precisa ter o git, Node.js e npm instalados para clonar e rodar este projeto.

> Foram usadas as versões `2.43.0`, `v20.18.1` e `10.8.2` para o git, Node.js e npm, respectivamente. É recomendado que utilize as mesmas ou as mais recentes versões LTS.

## Instalação
Execute `npm install` (ou `npm i` para a versão curta) para instalar as dependências de desenvolvedor.

## Testes
Neste projeto, você pode rodar os testes no viewport desktop ou mobile.

### Desktop
Execute `npm test` para rodar o teste em no modo headless em um viewport desktop.

Ou, execute `npm rum cy:open` para abrir o Cypress APP e rodar o teste em um viewport mobile.

### Mobile
Execute `npm run test:mobile` para rodar o teste em modo headless em um viewport mobile.

Ou, execute `npm run cy:open:mobile` para abrir o Cypress APP e rodar o teste em um viewport mobile.
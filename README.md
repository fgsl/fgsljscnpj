# fgsljscnpj

Componente Javascript para validar o CNPJ alfanumérico e gerar os dígitos verificadores

## Instalação

```shell
npm install fgsljscnpj
```

## Exemplo de uso

```shell
const CNPJ = require("fgsljscnpj");
const cnpj = new CNPJ();

let cnpjSemDV = "12ABC34501DE";

let dv = cnpj.calculaDV(cnpjSemDV)

console.log("Os dígitos verificadores de " + cnpjSemDV + " são " + dv);

let cnpjComDV = "12ABC34501DE35";

if (cnpj.isValid(cnpjComDV)){
    console.log("O cnpj " + cnpjComDV + " é válido" );
} else {
    console.log("O cnpj " + cnpjComDV + " não é válido" );
}
```

## Testes

Na pasta `test`, execute o seguinte comando para instalar o módulo fgsljscnpj:

```shell
npm link fgsljscnpj
```

Então execute o arquivo `script.js` assim:

```shell
node script.js
```

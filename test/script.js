/** 
* Teste de componente para validar CNPJ
* Baseada em https://www.serpro.gov.br/menu/noticias/noticias-2024/cnpj-alfanumerico
* Flávio Gomes da Silva Lisboa <flavio.lisboa@fgsl.eti.br>
* https://github.com/fgsl/fgslpycnpj
**/

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

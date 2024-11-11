/** 
* Componente para validar CNPJ
* Baseada em https://www.serpro.gov.br/menu/noticias/noticias-2024/cnpj-alfanumerico
* Flávio Gomes da Silva Lisboa <flavio.lisboa@fgsl.eti.br>
* https://github.com/fgsl/fgslpycnpj
**/
"use strict"; 

class CNPJ {

  constructor(){
    this.tamanhoCNPJSemDV = 12;
    this.regexCNPJSemDV = /^([A-Z\d]){12}$/;
    this.regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
    this.regexCaracteresMascara = /[./-]/g;
    this.regexCaracteresNaoPermitidos = /[^A-Z\d./-]/i;
    this.valorBase = "0".charCodeAt(0);
    this.pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    this.cnpjZerado = "00000000000000";  
  }


  isValid(cnpj) {
    if (!this.regexCaracteresNaoPermitidos.test(cnpj)) {
      let cnpjSemMascara = this.removeMascaraCNPJ(cnpj);
      if (this.regexCNPJ.test(cnpjSemMascara) && cnpjSemMascara !== this.cnpjZerado) {
        const dvInformado = cnpjSemMascara.substring(this.tamanhoCNPJSemDV);
        const dvCalculado = this.calculaDV(cnpjSemMascara.substring(0, this.tamanhoCNPJSemDV));
        return dvInformado === dvCalculado;
      }
    }
    return false;
  }

  calculaDV(cnpj) {
    if (!this.regexCaracteresNaoPermitidos.test(cnpj)) {
      let cnpjSemMascara = this.removeMascaraCNPJ(cnpj);
      if (this.regexCNPJSemDV.test(cnpjSemMascara) && cnpjSemMascara !== this.cnpjZerado.substring(0, this.tamanhoCNPJSemDV)) {
        let somatorioDV1 = 0;
        let somatorioDV2 = 0;
        for (let i = 0; i < this.tamanhoCNPJSemDV; i++) {
          const asciiDigito = cnpjSemMascara.charCodeAt(i) - this.valorBase;
          somatorioDV1 += asciiDigito * this.pesosDV[i + 1];
          somatorioDV2 += asciiDigito * this.pesosDV[i];
        }
        const dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
        somatorioDV2 += dv1 * this.pesosDV[this.tamanhoCNPJSemDV];
        const dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);
        return `${dv1}${dv2}`;
      }
    }
    throw new Error("Não é possível calcular o DV pois o CNPJ fornecido é inválido");
  }

  removeMascaraCNPJ(cnpj) {
      return cnpj.replace(this.regexCaracteresMascara, "");
  }
}

module.exports = CNPJ;
    

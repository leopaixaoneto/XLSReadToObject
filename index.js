const excelDoll = require("./excelDoll");

(async () => {
  var doll = new excelDoll();

  let pessoas = await doll.excelToObjects("./files/Pessoas.xlsx");
  let dados = await doll.excelToObjects("./files/dados.xlsx");

  let merged = await doll.mergeObjects(pessoas.objects, dados.objects, "Nome");

  merged = await doll.removeProps(merged, ["saldo"]);
  console.log(merged);
  //console.log(pessoas);
  //console.log(dados);
})();

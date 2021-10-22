const readXlsxFile = require("read-excel-file/node");

// class excelDoll{

//   constructor()
//   {
//     this.parent = this;
//   }

//   async excelToObjects(){
//     // File path.
//     var objects = [];
//     let props = [];

//     readXlsxFile(filePath).then(rows => {
//       // `rows` is an array of rows
//       // each row being an array of cells.

//       rows[0].forEach(row0Element => {
//         props.push(row0Element);
//       });

//       rows.forEach((element, index) => {
//         if (index == 0) return;

//         let nObject = {};

//         props.forEach((elementProp, index) => {
//           nObject[elementProp] = element[index];
//         });
//         objects.push(nObject);
//       });
//       return objects;
//     });
//   }

// }

function excelDoll() {
  this.parent = this;

  this.excelToObjects = async filePath => {
    // File path.
    var objects = [];
    let props = [];

    await readXlsxFile(filePath).then(rows => {
      // `rows` is an array of rows
      // each row being an array of cells.

      rows[0].forEach(row0Element => {
        props.push(row0Element);
      });

      rows.forEach((element, index) => {
        if (index == 0) return;

        let nObject = {};

        props.forEach((elementProp, index) => {
          elementProp = elementProp
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          nObject[elementProp] = element[index];
        });
        objects.push(nObject);
      });
    });

    return { objects: objects, keys: props };
  };

  this.mergeObjects = async (obj1, obj2, key) => {
    obj1.forEach((element, index) => {
      let aux = obj2.filter(x => {
        return x[key] == element[key];
      });

      aux.forEach(elementObj2 => {
        Object.keys(elementObj2).forEach(keyObj2 => {
          if (keyObj2 == key) return;
          keyObj2 = keyObj2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          element[keyObj2] = elementObj2[keyObj2];
        });
      });
    });
    return obj1;
  };

  this.removeProps = async (obj1, props) => {
    obj1.forEach(element => {
      props.forEach(prop => {
        delete element[prop];
      });
    });

    return obj1;
  };
}

module.exports = excelDoll;

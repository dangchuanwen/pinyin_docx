const officegen = require("officegen");
const fs = require("fs");
const path = require("path");

function generateDocx(pinyins, newDocxName) {
  return new Promise((resolve, reject) => {
    let docx = officegen("docx");

    docx.on("finalize", function (written) {
      resolve(newDocxName);
      console.log("Finish to create a Word document.");
    });

    docx.on("err", function (err) {
      reject(err);
      console.log(err);
    });

    function SPACE(num) {
      return new Array(num).fill(" ").join("");
    }

    let pObj = docx.createP();
    let count = 0;
    let temp = [];
    let line = 0;

    for (let i = 0; i < pinyins.length; i++) {
      count++;
      temp.push(pinyins[i]);
      if (count === 5 || i === pinyins.length - 1) {
        count = 0;
        line++;
        /* 五个为一行写入 */

        // 将五个拼音写入到一行
        temp.forEach((pinyin) => {
          pObj.addText(SPACE(1), { font_size: 17 });
          pObj.addText(pinyin, { font_size: 17 });
          pObj.addText(SPACE(1), { font_size: 17 });
          pObj.addText(SPACE(13));
        });
        // 换行，下一行写括号
        pObj.addLineBreak();
        // 写括号
        temp.forEach((item) => {
          pObj.addText("(", { font_size: 17 });
          pObj.addText( item, { font_size: 17, color: 'ffffff' } );
          pObj.addText(")", { font_size: 17 });
          pObj.addText(SPACE(12));
        });
        pObj.addLineBreak();
        pObj.addLineBreak();
        temp = [];
      }

      if (line === 12) {
        line = 0;
        pObj.addLineBreak();
        pObj.addLineBreak();
      }
    }

    let out = fs.createWriteStream(newDocxName);

    out.on("error", function (err) {
      reject(err);
      console.log(err);
    });

    docx.generate(out);
    
  });
}

module.exports = generateDocx;

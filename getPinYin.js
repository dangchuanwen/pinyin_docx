const request = require("superagent");
const cheerio = require("cheerio");

function getPinYin(word) {
  return new Promise((resolve, reject) => {
    request
    .get(encodeURI(`https://hanyu.baidu.com/s?wd=${word}&ptype=zici`))
    .then((res) => {
      if (res && res.text) {
        const $ = cheerio.load(res.text);
        const pinyin_string = $("dt.pinyin").text();
        const match = pinyin_string.match(/\[(.*)\]/);
        const pinyin = (Array.isArray(match) && match[1] && match[1].trim()) || "";  
        resolve(pinyin);
      } else {
        reject("抓取网页失败");
      }
    });
  });
}

module.exports = getPinYin;

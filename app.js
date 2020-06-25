const getPinYin = require("./getPinYin");
const koaStatic = require('koa-static');
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const generateDocx = require("./generateDocx");

const app = new Koa();

app.use(bodyParser());
app.use(koaStatic('.'));

function Moment(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function Response(status, msg, data) {
  const res = {
    status,
    msg,
    data
  };
  return JSON.stringify(res);
}

app.use(async ctx => {
  let body = "";
  const { word_list } = ctx.request.body;
  const pinyins = [];
  
  if (word_list) {
    
    const list = JSON.parse(word_list);
    
    for (let word of list) {
      const pinyin = await getPinYin(word);
      pinyins.push(pinyin);
      await Moment(20);
    }
    
    // 生成的文档名字 = 时间戳 + 随机数
    const newDocxName = String(new Date().getTime()) + String(Math.ceil(Math.random() * 100)) + ".docx"; 
    await generateDocx(pinyins, newDocxName);
    // 生成 docx 的链接供用户下载
    const href = `http://${ ctx.request.host }/${ newDocxName }`;
    body = Response(0, "生成文档成功", { href: href })

  } else {
    body = Response(-1, "获取参数失败", {});
  }
  
  ctx.body = body;

});

app.listen(3001, () => {
  console.log("run at 3001")
});
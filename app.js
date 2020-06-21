const getPinYin = require("./getPinYin");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const generateDocx = require("./generateDocx");

const app = new Koa();

app.use(bodyParser());

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
    
    await generateDocx(pinyins);
    body = Response(0, "生成文档成功", { href: "" })

  } else {
    body = Response(-1, "获取参数失败", {});
  }
  
  ctx.body = body;

});

app.listen(3001);
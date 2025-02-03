const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

const { createUserHandler } = require('./userController'); 

app.use(async (ctx) => {
  if (ctx.path === '/users' && ctx.method === 'POST') {
    await createUserHandler(ctx);
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Rota não encontrada' };
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
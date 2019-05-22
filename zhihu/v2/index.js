import fetch from 'isomorphic-fetch';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/app';
import Router from 'koa-router'
import Koa from 'koa'
import Bundler from 'parcel-bundler';
import serve from 'koa-static';

// const path = require('path');
// const static = require('koa-static');
// const staticPath = './v2/public';

// app.use(static(path.join(__dirname,staticPath)))

const app = new Koa()
const router = new Router()

const renderHTML = (data) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${data.title || ''}</title>
    </head>
    <body>
        <div id="app">${data.body}</div>
        <script>window.__INIT_STATE__ = (${data.state})</script>
        <script src="/app.js"></script>
    </body>
    </html>
`;
const cache = {};

router
  .get('/autocomplete/:key', async ctx => {
    const key = ctx.params.key;
    const url = `https://www.zhihu.com/autocomplete?token=${key}`;
    if (cache[key]) {
      ctx.body = cache[key];
      return;
  }
    try {
        const res = await fetch(url).then(res => res.json());
        const data = res[0].filter(i => i[0] === 'question')
            .map(i => ({ text: onlyspace(i[1]), count: i[4], id: i[3] }));
            cache[key] = data;
            ctx.body = data || [];
    }
    catch (err) {
        ctx.body = [];
    }
  })
  .get('/',ctx => {
    const state = {keyword:'',hots:[]}
    ctx.body = renderHTML({
      title: 'React 服务端渲染实战',
      body: renderToString(<App initState={state} />),
      state: JSON.stringify(state),
    })
  })


app
  .use(serve('public'))
  .use(router.routes())
  .listen(3000,() => {
    const bundler = new Bundler('./v2/client/app.js',{
      outDir: 'public',
      sourceMaps: false,
      minify: false,
    })
    // const bundle = await bundler.bundle();
    bundler.bundle().then(() => {
      console.log('port 3000')
    })
    bundler.on('buildEnd', () => {
        console.log('client javascript build complete.');
    });
    bundler.on('error', err => {
        console.log('client javascript build error:', err);
    });
  })
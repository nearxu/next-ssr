import Koa from 'koa'
import React from 'react'
import {renderToString} from 'react-dom/server'

const app = new Koa()

app.use(ctx => {
  const html = renderToString(
    <div>
      <h1>hello world</h1>
    </div>
  )
  ctx.body = html
})

app.listen(3000 , () => {
  console.log('port 3000')
})

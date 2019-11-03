import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom';

const app = express();

app.get('*',(req,res)=>{
  res.send(render(<div>1</div>));
})

app.listen(3000,()=>console.log('APP START'));

const render = (component)=>{
  const content = renderToString(component)
  return `
    <html>
      <head>
        <title>111</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}
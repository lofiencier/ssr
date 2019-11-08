import React from 'react';
import { renderToString } from 'react-dom/server';
import { minify } from 'html-minifier';

const getHtmlString=(content,scripts,styles)=>{
  const Html = <html>
    <head>
      <title>template</title>
      {styles.map(link=>link)}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{__html:content}}></div>
      <div dangerouslySetInnerHTML={{__html:scripts}}></div>
      {/* {scripts} */}
    </body>
  </html>;
  const htmlString = renderToString(Html);
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };
  return minify(htmlString, minifyConfig)
}

export default getHtmlString;
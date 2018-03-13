import express from 'express';
import qs from 'qs';
import path from 'path';
import compression from 'compression';
import React from 'react';

// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
// import webpackServerConfig from '../../webpack.server.config';
import routes from '../../src/common/routes';
import configureStore from '../../src/services/store/configureStore';
import { fetchCounter } from '../../src/services/api/counter';


// HTML Markup，同時也把 preloadedState 轉成字串（stringify）傳到 client-side，又稱為 dehydration（脫水）
// function renderFullPage(html, preloadedState) {
//     return `
//       <!doctype html>
//       <html>
//         <head>
//           <title>Redux Universal Example</title>
//         </head>
//         <body>
//           <div id="app">${html}</div>
//           <script>
//             window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
//           </script>
//           <script src="/static/bundle.js"></script>
//         </body>
//       </html>
//       `;
// }

function renderPage(appHtml, preloadedState) {
    return `
<!doctype html public="storage">
<html>
    <head>
        <meta charset=utf-8/>
        <meta name="description" content=">Tobu">
        <title>Tobu</title>
        <link rel="icon" href="/favicon.ico">
        <!--reset.css-->
        <link rel="stylesheet" href="css/reset.css">
        <!--主要的css-->
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="css/about.css">
        <link rel="stylesheet" href="css/portfolio.css">
    </head>
    <body>
        <div id=app>${appHtml}</div>
        <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
 `;
}
// function handleRender(req, res) {
//     // 模仿實際非同步 api 處理情形
//     fetchCounter((apiResult) => {
//         // 讀取 api 提供的資料（這邊我們 api 是用 setTimeout 進行模仿非同步狀況），
//         // 若網址參數有值擇取值，若無則使用 api 提供的隨機值，若都沒有則取 0
//         const params = qs.parse(req.query);
//         const counter = parseInt(params.counter, 10) || apiResult || 0;
//         // 將 initialState 轉成 immutable 和符合 state 設計的格式
//         const initialState = fromJS({
//             counterReducers: {
//                 count: counter,
//             },
//         });
//         // 建立一個 redux store
//         const store = configureStore(initialState);
//         // 使用 renderToString 將 component 轉為 string
//         const html = renderToString(
//           <Provider store={store}>
//             <RouterContext {...props} />
//           </Provider>,
//         );

//         // 從建立的 redux store 中取得 initialState
//         const finalState = store.getState();
//         // 將 HTML 和 initialState 傳到 client-side
//         console.log(html);
//         res.send(renderPage(html, finalState));
//     });
// }


const app = express();
app.use(compression());
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, '../../publish')));
// app.use('./', express.static(path.join(__dirname, '../..', 'publish')));


app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
        // in here we can make some decisions all at once
        if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message);
        } else if (redirect) {
            // we haven't talked about `onEnter` hooks on routes, but before a
            // route is entered, it can redirect. Here we handle on the server.
            res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            // if we got props then we matched a route and can render


            // const appHtml = renderToString(<RouterContext {...props} />);
            // res.send(renderPage(appHtml));

            // 模仿實際非同步 api 處理情形
            fetchCounter((apiResult) => {
                // 讀取 api 提供的資料（這邊我們 api 是用 setTimeout 進行模仿非同步狀況），
                // 若網址參數有值擇取值，若無則使用 api 提供的隨機值，若都沒有則取 0
                const params = qs.parse(req.query);
                const counter = parseInt(params.counter, 10) || apiResult || 0;
                // 將 initialState 轉成 immutable 和符合 state 設計的格式
                const initialState = fromJS({
                    counterReducers: {
                        count: counter,
                    },
                });
                // 建立一個 redux store
                const store = configureStore(initialState);
                // 使用 renderToString 將 component 轉為 string
                const html = renderToString(
                  <Provider store={store}>
                    <RouterContext {...props} />
                  </Provider>,
                );

                // 從建立的 redux store 中取得 initialState
                const finalState = store.getState();
                // 將 HTML 和 initialState 傳到 client-side
                console.log(html);
                res.send(renderPage(html, finalState));
            });
        } else {
            // no errors, no redirect, we just didn't match anything
            res.status(404).send('Not Found');
        }
    });
});
/* 參考來源 https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering */


// 尚未成功Q_Q
// ////////////////////////////////////////////////////
// // 使用 middleware 於 webpack 去進行 hot module reloading
// const compiler = webpack(webpackConfig);
// app.use(webpackDevMiddleware(
//     compiler,
//     { noInfo: true, publicPath: webpackConfig.output.publicPath },
// ));

// app.use(webpackHotMiddleware(compiler));
// console.log(`Path:${webpackConfig.output.publicPath}`);

// const servercompiler = webpack(webpackServerConfig);
// app.use(webpackDevMiddleware(
//     servercompiler,
//     { noInfo: true, publicPath: webpackServerConfig.output.publicPath },
// ));
// app.use(webpackHotMiddleware(servercompiler));
// ////////////////////////////////////////////////////

// 使用 middleware 於 webpack 去進行 hot module reloading
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// 每次 server 接到 request 都會呼叫 handleRender
// app.use(handleRender);

const PORT = process.env.PORT || 8080;
// setTimeout(() => {

// }, 3000);
app.listen(PORT, () => {
    console.info(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
});

// 引用 babel-polyfill 避免瀏覽器不支援部分 ES6 用法
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

// import routes and pass them into <Router/>
import routes from '../../src/common/routes';
// import '../../publish/css/index.css';
// import '../../publish/css/about.css';
// import '../../publish/css/portfolio.css';
import configureStore from '../../src/services/store/configureStore';

// 從 server 取得傳進來的 initialState。由於從字串轉回物件，又稱為 rehydration（覆水）
const initialState = window.PRELOADED_STATE;
// 由於我們使用 ImmutableJS，
// 所以需要把在 server-side dehydration（脫水）又在前端 rehydration（覆水）的 initialState 轉成 ImmutableJS 資料型態，
// 並傳進 configureStore 建立 store

const store = configureStore(fromJS(initialState));
// 接下來就跟一般的 React App 一樣，把 store 透過 Provider 往下傳到 Component 中


// render(
//   <Provider store={store}>
//     <Router routes={routes} history={browserHistory} />
//   </Provider>,
//   document.getElementById('app'),
// );
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app'),
);

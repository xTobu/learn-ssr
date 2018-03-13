/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _qs = __webpack_require__(2);

	var _qs2 = _interopRequireDefault(_qs);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(4);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _server = __webpack_require__(7);

	var _reactRedux = __webpack_require__(8);

	var _immutable = __webpack_require__(9);

	var _webpack = __webpack_require__(10);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackDevMiddleware = __webpack_require__(11);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(12);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _webpack3 = __webpack_require__(13);

	var _webpack4 = _interopRequireDefault(_webpack3);

	var _routes = __webpack_require__(14);

	var _routes2 = _interopRequireDefault(_routes);

	var _configureStore = __webpack_require__(31);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _counter = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	// we'll use this to render our app to an html string
	function renderPage(appHtml, preloadedState) {
	    return '\n<!doctype html public="storage">\n<html>\n    <head>\n        <meta charset=utf-8/>\n        <meta name="description" content=">Tobu">\n        <title>Tobu</title>\n        <link rel="icon" href="/favicon.ico">\n        <!--reset.css-->\n        <link rel="stylesheet" href="css/reset.css">\n        <!--\u4E3B\u8981\u7684css-->\n        <link rel="stylesheet" href="css/index.css">\n        <link rel="stylesheet" href="css/about.css">\n        <link rel="stylesheet" href="css/portfolio.css">\n    </head>\n    <body>\n        <div id=app>' + appHtml + '</div>\n        <script>\n            window.PRELOADED_STATE = ' + JSON.stringify(preloadedState).replace(/</g, '\\x3c') + '\n        </script>\n        <script src="/bundle.js"></script>\n    </body>\n</html>\n ';
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


	// import webpackServerConfig from '../../webpack.server.config';


	// and these to match the url to routes and then render
	var app = (0, _express2.default)();
	app.use((0, _compression2.default)());
	// serve our static stuff like index.css
	app.use(_express2.default.static(_path2.default.join(__dirname, '../../publish')));
	// app.use('./', express.static(path.join(__dirname, '../..', 'publish')));


	app.get('*', function (req, res) {
	    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
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
	            (0, _counter.fetchCounter)(function (apiResult) {
	                // 讀取 api 提供的資料（這邊我們 api 是用 setTimeout 進行模仿非同步狀況），
	                // 若網址參數有值擇取值，若無則使用 api 提供的隨機值，若都沒有則取 0
	                var params = _qs2.default.parse(req.query);
	                var counter = parseInt(params.counter, 10) || apiResult || 0;
	                // 將 initialState 轉成 immutable 和符合 state 設計的格式
	                var initialState = (0, _immutable.fromJS)({
	                    counterReducers: {
	                        count: counter
	                    }
	                });
	                // 建立一個 redux store
	                var store = (0, _configureStore2.default)(initialState);
	                // 使用 renderToString 將 component 轉為 string
	                var html = (0, _server.renderToString)(_react2.default.createElement(
	                    _reactRedux.Provider,
	                    { store: store },
	                    _react2.default.createElement(_reactRouter.RouterContext, props)
	                ));

	                // 從建立的 redux store 中取得 initialState
	                var finalState = store.getState();
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
	var compiler = (0, _webpack2.default)(_webpack4.default);
	app.use((0, _webpackDevMiddleware2.default)(compiler, {
	    noInfo: true,
	    publicPath: _webpack4.default.output.publicPath
	}));
	app.use((0, _webpackHotMiddleware2.default)(compiler));

	// 每次 server 接到 request 都會呼叫 handleRender
	// app.use(handleRender);

	var PORT = process.env.PORT || 8080;
	// setTimeout(() => {

	// }, 3000);
	app.listen(PORT, function () {
	    console.info('==> \uD83C\uDF0E  Listening on port ' + PORT + '. Open up http://localhost:' + PORT + '/ in your browser.');
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "entry\\server"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("qs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("compression");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("react-redux");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("immutable");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("webpack");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var webpack = __webpack_require__(10);
	var path = __webpack_require__(3);

	module.exports = {

	    // target: 'node',
	    node: {
	        __dirname: false
	    },
	    entry: './entry/client',
	    output: {
	        path: path.resolve(__dirname, './publish'),
	        filename: 'bundle.js',
	        publicPath: '/'
	    },

	    plugins: process.env.NODE_ENV === 'production' ? [new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()] : [],

	    module: {
	        preLoaders: [{
	            test: /\.jsx$|\.js$/,
	            loader: 'eslint-loader',
	            include: __dirname + '/app',
	            exclude: /bundle\.js$/
	        }],
	        loaders: [{
	            test: /\.jsx?$/, // Match both .js and .jsx files
	            exclude: /node_modules/,
	            loader: 'babel-loader'

	        }, {
	            test: /\.(jpe?g|png|gif|svg|jpg)$/i,
	            loader: 'file-loader',
	            options: {
	                name: '[path][name].[ext]?[hash]'
	            }
	        }, {
	            test: /\.(css|scss|sass)$/,
	            loaders: ['style-loader', 'css-loader', 'sass-loader'],
	            options: {
	                name: '[path][name].[ext]?[hash]'
	            }
	        }]
	    },
	    devServer: {
	        inline: true,
	        port: 8080
	    },
	    resolve: {
	        fallback: path.join(__dirname, 'node_modules'),
	        extensions: ['', '.js', '.jsx', '.json'],
	        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
	    },
	    resolveLoader: { fallback: path.join(__dirname, 'node_modules') }

	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _Wrap = __webpack_require__(15);

	var _Wrap2 = _interopRequireDefault(_Wrap);

	var _About = __webpack_require__(21);

	var _About2 = _interopRequireDefault(_About);

	var _Portfolio = __webpack_require__(22);

	var _Portfolio2 = _interopRequireDefault(_Portfolio);

	var _CounterContainer = __webpack_require__(24);

	var _CounterContainer2 = _interopRequireDefault(_CounterContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// modules/routes.js
	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _Wrap2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _About2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/portfolio', component: _Portfolio2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/redux', component: _CounterContainer2.default })
	);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsCssTransitionGroup = __webpack_require__(16);

	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

	var _Header = __webpack_require__(17);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(20);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import './wrap.sass';

	exports.default = _react2.default.createClass({
	  displayName: 'Wrap',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'wrap' },
	      _react2.default.createElement(_Header2.default, null),
	      _react2.default.createElement(
	        _reactAddonsCssTransitionGroup2.default,
	        {
	          component: 'div',
	          className: 'content',
	          transitionName: 'example',
	          transitionEnterTimeout: 500,
	          transitionLeaveTimeout: 0.1
	        },
	        _react2.default.cloneElement(this.props.children, {
	          key: this.props.location.pathname
	        })
	      ),
	      _react2.default.createElement(_Footer2.default, null)
	    );
	  }
	});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("react-addons-css-transition-group");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(18);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Header',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'header' },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Tobu'
	      ),
	      _react2.default.createElement(
	        'nav',
	        null,
	        _react2.default.createElement(
	          'span',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/', onlyActiveOnIndex: true },
	            'About'
	          )
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/portfolio' },
	            'Portfolio'
	          )
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: 'https://xtobu.github.io/', target: '_blank', rel: 'noopener noreferrer' },
	            'Notes'
	          )
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/redux' },
	            'Redux'
	          )
	        )
	      )
	    );
	  }
	});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NavLink = __webpack_require__(19);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_NavLink).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // modules/NavLink.js


	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'NavLink',
	    render: function render() {
	        return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'selected' }));
	    }
	});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: "Footer",
	    render: function render() {
	        return _react2.default.createElement(
	            "div",
	            { className: "footer" },
	            "Copyright \xA9 2017 - Junxiang"
	        );
	    }
	});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import '../../../../publish/css/about.css';

	exports.default = _react2.default.createClass({
	  displayName: "About",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "about" },
	      _react2.default.createElement(
	        "div",
	        { id: "Profile" },
	        _react2.default.createElement("img", { src: "img/Profile.jpg", alt: "Profile" })
	      ),
	      _react2.default.createElement(
	        "h2",
	        null,
	        "About me"
	      ),
	      _react2.default.createElement(
	        "p",
	        null,
	        "A self-taught developer who learned from TreeHouse & StackOverflow."
	      ),
	      _react2.default.createElement("hr", null),
	      _react2.default.createElement(
	        "p",
	        { className: "bold" },
	        "Skills\uFF1A"
	      ),
	      _react2.default.createElement(
	        "ul",
	        null,
	        _react2.default.createElement(
	          "li",
	          null,
	          "javascript, C#"
	        ),
	        _react2.default.createElement(
	          "li",
	          null,
	          "React, Webpack, ESLint, jQuery, TweenMax, SlickJS, WowJS"
	        ),
	        _react2.default.createElement(
	          "li",
	          null,
	          "Node.js, ASP.NET MVC, GCP, Azure, AWS"
	        )
	      ),
	      _react2.default.createElement("hr", null),
	      _react2.default.createElement(
	        "p",
	        { className: "bold" },
	        "Work history\uFF1A"
	      ),
	      _react2.default.createElement(
	        "ul",
	        null,
	        _react2.default.createElement(
	          "li",
	          null,
	          "Back-end Intern in MSI."
	        ),
	        _react2.default.createElement(
	          "li",
	          null,
	          "Front-end Developer in WebGene."
	        )
	      ),
	      _react2.default.createElement("hr", null)
	    );
	  }
	});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Cube = __webpack_require__(23);

	var _Cube2 = _interopRequireDefault(_Cube);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import '../../../../publish/css/portfolio.css';

	exports.default = _react2.default.createClass({
	  displayName: 'Portfolio',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'portfolio' },
	      _react2.default.createElement(_Cube2.default, {
	        CubeUrl: 'https://www.sprite.tw/2017coolgame24s/index.html',
	        HeaderImg: '/img/projects/header/sprite.jpg',
	        HeaderTitle: 'Sprite',
	        HeaderEvent: '\u6C81\u6DBC\u7D55\u6BBA24\u79D2',
	        ContentImg: 'img/projects/1.png'
	      }),
	      _react2.default.createElement(_Cube2.default, {
	        CubeUrl: 'http://cell.webgene.com.tw/technic/project/Sprite/aws/2017beyou/',
	        HeaderImg: '/img/projects/header/sprite.jpg',
	        HeaderTitle: 'Sprite',
	        HeaderEvent: 'COOL\u73A9\u74F6',
	        ContentImg: 'img/projects/2.png'
	      }),
	      _react2.default.createElement(_Cube2.default, {
	        CubeUrl: 'http://cell.webgene.com.tw/technic/Junxiang/FUBON/0503Vicky/',
	        HeaderImg: '/img/projects/header/fubon.png',
	        HeaderTitle: 'Fubon',
	        HeaderEvent: '\u70BA\u4F60\u52A0\u6CB9 \u53CB\u529B\u653E\u9001',
	        ContentImg: 'img/projects/3.png'
	      })
	    );
	  }
	});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "Cube",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "cube" },
	      _react2.default.createElement(
	        "div",
	        { className: "cube_header" },
	        _react2.default.createElement("img", { className: "cube_img", src: this.props.HeaderImg, alt: "cube_img" }),
	        _react2.default.createElement(
	          "div",
	          { className: "cube_title" },
	          _react2.default.createElement(
	            "ul",
	            null,
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: this.props.CubeUrl, target: "_blank", className: "cube_title_brand" },
	                this.props.HeaderTitle
	              )
	            ),
	            _react2.default.createElement(
	              "li",
	              null,
	              _react2.default.createElement(
	                "a",
	                { href: this.props.CubeUrl, target: "_blank", className: "cube_title_event" },
	                this.props.HeaderEvent
	              )
	            )
	          )
	        )
	      ),
	      _react2.default.createElement("hr", null),
	      _react2.default.createElement(
	        "a",
	        { href: this.props.CubeUrl, target: "_blank" },
	        _react2.default.createElement("img", { className: "imgBox", src: this.props.ContentImg, alt: "" })
	      )
	    );
	  }
	});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(25);

	var _reactRedux = __webpack_require__(8);

	var _Counter = __webpack_require__(26);

	var _Counter2 = _interopRequireDefault(_Counter);

	var _actions = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    count: state.get('counterReducers').get('count')
	  };
	}, function (dispatch) {
	  return {
	    onIncrement: function onIncrement() {
	      return dispatch((0, _actions.incrementCount)());
	    },
	    onDecrement: function onDecrement() {
	      return dispatch((0, _actions.decrementCount)());
	    }
	  };
	})(_Counter2.default);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Counter = function Counter(_ref) {
	  var count = _ref.count,
	      onIncrement = _ref.onIncrement,
	      onDecrement = _ref.onDecrement;
	  return _react2.default.createElement(
	    'p',
	    null,
	    'Clicked: ',
	    count,
	    ' times',
	    ' ',
	    _react2.default.createElement(
	      'button',
	      { onClick: onIncrement },
	      '+'
	    ),
	    ' ',
	    _react2.default.createElement(
	      'button',
	      { onClick: onDecrement },
	      '-'
	    ),
	    ' '
	  );
	};

	// 注意要檢查 propTypes 和給定預設值
	Counter.propTypes = {
	  count: _react.PropTypes.number.isRequired,
	  onIncrement: _react.PropTypes.func.isRequired,
	  onDecrement: _react.PropTypes.func.isRequired
	};

	Counter.defaultProps = {
	  count: 0,
	  onIncrement: function onIncrement() {},
	  onDecrement: function onDecrement() {}
	};

	exports.default = Counter;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _counterActions = __webpack_require__(28);

	Object.keys(_counterActions).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _counterActions[key];
	    }
	  });
	});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decrementCount = exports.incrementCount = undefined;

	var _reduxActions = __webpack_require__(29);

	var _actionTypes = __webpack_require__(30);

	var incrementCount = exports.incrementCount = (0, _reduxActions.createAction)(_actionTypes.INCREMENT_COUNT);
	var decrementCount = exports.decrementCount = (0, _reduxActions.createAction)(_actionTypes.DECREMENT_COUNT);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("redux-actions");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var INCREMENT_COUNT = exports.INCREMENT_COUNT = 'INCREMENT_COUNT';
	var DECREMENT_COUNT = exports.DECREMENT_COUNT = 'DECREMENT_COUNT';

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(32);

	var _reduxThunk = __webpack_require__(33);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(34);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(35);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore(preloadedState) {
	    var store = (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)((0, _reduxLogger2.default)({ stateTransformer: function stateTransformer(state) {
	            return state.toJS();
	        } }), _reduxThunk2.default));
	    return store;
	}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = require("redux");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = require("redux-logger");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reduxImmutable = __webpack_require__(36);

	var _counterReducers = __webpack_require__(37);

	var _counterReducers2 = _interopRequireDefault(_counterReducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _reduxImmutable.combineReducers)({
	    counterReducers: _counterReducers2.default
	});

	exports.default = rootReducer;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = require("redux-immutable");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immutable = __webpack_require__(9);

	var _reduxActions = __webpack_require__(29);

	var _models = __webpack_require__(38);

	var _actionTypes = __webpack_require__(30);

	var counterReducers = (0, _reduxActions.handleActions)({
	  INCREMENT_COUNT: function INCREMENT_COUNT(state) {
	    return state.set('count', state.get('count') + 1);
	  },
	  DECREMENT_COUNT: function DECREMENT_COUNT(state) {
	    return state.set('count', state.get('count') - 1);
	  }
	}, _models.CounterState);

	exports.default = counterReducers;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CounterState = undefined;

	var _immutable = __webpack_require__(9);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// initstate model
	var CounterState = _immutable2.default.Record({
	    count: 0
	});

	exports.CounterState = CounterState;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchCounter = fetchCounter;
	function getRandomInt(min, max) {
	    // return Math.floor(Math.random() * (max - min)) + min
	    return 10;
	}

	function fetchCounter(callback) {
	    setTimeout(function () {
	        callback(getRandomInt(1, 100));
	    }, 500);
	}

/***/ })
/******/ ]);
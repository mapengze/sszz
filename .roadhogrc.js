const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  //接口代理
  "proxy": {
    "/api/v1/users": {
      "target": "http://172.12.1.206:9090",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/users" : "/problem/findProblem" }
    },
    "/api/problem/addProblem": {
      "target": "http://172.12.1.206:9090",
      "changeOrigin": true,
      "pathRewrite": { "^/api/problem/addProblem" : "/problem/addProblem" }
    },
    "/api/problem/deleteProblem": {
      "target": "http://172.12.1.206:9090",
      "changeOrigin": true,
      "pathRewrite": { "^/api/problem/deleteProblem" : "/problem/deleteProblem" }
    },
    "/api/problem/updateProblem": {
      "target": "http://172.12.1.206:9090",
      "changeOrigin": true,
      "pathRewrite": { "^/api/problem/updateProblem" : "/problem/updateProblem" }
    },
   /* "/api/problem/findProblemAndAnswerLike": {
      "target": "http://172.12.1.206:9090",
      "changeOrigin": true,
      "pathRewrite": { "^/api/problem/findProblemAndAnswerLike" : "/problem/findProblemAndAnswerLike" }
    },*/
  },
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }]
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}

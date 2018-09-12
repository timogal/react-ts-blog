## A blog frontend build with React and Typescript

In progress...

目录结构参照: [https://github.com/react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

typescript配置参照：[https://github.com/Microsoft/TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)

### 启动

启动开发环境: `yarn dev`

### 正式环境

```
npm start
```

使用[pm2](https://github.com/Unitech/pm2)

```
npm run build
pm2 start process.json
```

### 功能

* [x]  Redux状态管理
* [x]  主体页面
* [x]  SSR - 服务端渲染
* [ ]  响应式
* [x]  Production Build

### Tips

#### node-sass安装失败

`yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ [--global/-g]`

或参考：[https://github.com/lmk123/blog/issues/28](https://github.com/lmk123/blog/issues/28)

#### html2json的修改

修改**node_modules/html2json/src/html2json.js**的115行为：

```javascript
var parent = bufArray[0] || results;
```

参考：[https://github.com/Jxck/html2json/pull/30](https://github.com/Jxck/html2json/pull/30)


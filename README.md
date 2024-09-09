# vue3-vant

## Project setup

```
创建 Vite + Vue 3 项目：
1、
create-vite vite-vue3-project
cd my-vue3-project
npm install axios lodash element-plus
2、vite + vue
npm init vite@latest 项目名 -- --template vue
例如：
  npm: npm create vite@latest my-vue-app -- --template vue
  yarn: yarn create vite my-vue-app --template vue
  pnpm: pnpm create vite my-vue-app --template vue
cd 项目名称
npm install 安装依赖

3、官方支持：vue-create: npm init vue@latest
vue3项目配置按需自动引入自定义组件：
npm install -D unplugin-vue-components unplugin-auto-import
```

插件安装

```
axios
echarts
less
less-loader
lodash-es
mockjs
node-sass
postcss
postcss-px-to-viewport
prettier
sass
sass-loader
typescript
unplugin-auto-import
unplugin-element-plus
unplugin-vue-components
vue-echart
@vue/babel-plugin-jsx // 支持jsx语法
```

```
vue3-vant
├─ .browserslistrc
├─ .gitignore
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ less
│  │  │  ├─ vant_theme.css
│  │  │  └─ vant_theme.less
│  │  └─ logo.png
│  ├─ components
│  ├─ main.ts
│  ├─ router
│  │  └─ index.ts
│  ├─ shims-vue.d.ts
│  └─ views
│     ├─ AboutView.vue
│     └─ HomeView.vue
├─ tsconfig.json
└─ vue.config.js

```

```
 vue3 全局loading加载的情况：
 1、首次打开页面时 loading：通过根目录 index.html文件，在 <div id='app'> 里添加内容，就是过度内容，当vue实例创建完成，通过.mount() 方法挂载到 id='app' 的div 里，会替换掉里的loading内容；
 2、路由切换时、异步组件 loading
    路由切换过度 可以使用vue3 的内置组件 <Suspense>；
    <Suspense> 提供 2 个插槽 👇；
    #default : 一个要加载的内容 ；
    #fallback: 一个加载中显示的内容；
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <h1>加载中......</h1>
    </template>
```
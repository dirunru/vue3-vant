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

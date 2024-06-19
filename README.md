# vue3-vant

## Project setup
```
创建 Vite + Vue 3 项目：
create-vite vite-vue3-project
cd my-vue3-project
npm install axios lodash element-plus

vue3项目配置按需自动引入自定义组件：
npm install -D unplugin-vue-components unplugin-auto-import
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
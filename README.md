# panono

>一個 Vue.js 搭配 Ａframe 的 WebVR 專案

## 資料夾結構
```
panono/
  README.md
  node_modules/
  package.json
  package-lock.json
  babel.config.js
  vue.config.js 
  .gitignore
  .editorconfig
  public/
    index.html
    favicon.ico
  src/
    assets/
    components/
      Thumbnails.vue
      Scene.vue
    config/
      db.js (firebase)
    views/
      Home.vue
    App.vue
    main.js
    router.css
    index.js
    store.js
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 如何瀏覽
專案啟動後在 url 加上你的 live tour id
例: localhost:8081/#/

也可以在 live tour id 後面指定場景 (index 從0開始)  
例: 
1. localhost:8081/#/hola
2. localhost:8081/#/yocico
3. localhost:8081/#/rangeRover

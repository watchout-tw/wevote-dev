
#沃草！立委出任務 - 2016立委投票攻略


2016立委選舉票該投給誰？「立委出任務」透過類遊戲互動方式，提供選民快速了解現任立委與下任候選人立場，並分析政黨針對議題的整體立場。

想透過議題更了解你的選區立委嗎？請上[立委出任務](http://wevote.tw/)！


# License

如非特別註明，本站資料及原始碼 統一採用創用[CC姓名標示─非商業性─相同方式分享4.0 (CC-BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)國際授權條款釋出。

注意：

- 從立法院網站來源的資料，如立委照片、公報內容等，必須在遵守立法院的著作權規範之下取用。
- 如果在著作權方面有疑慮、建議或是想取得更進一步授權，請來信 wevote@watchout.tw 。

特別感謝[Typeland《隸辨隸書體》](http://wytype.com/typeface/earlier/) 作者厉向晨讓我們在這個網站的圖像創作中自由使用《隸辨隸書體》。


# Setup

### start the app

- `$npm install && npm start`

- http://localhost:8080/

### develop mode

- `$npm run dev`

- http://localhost:3000/

### build to static site

- `$npm run build && npm start`

- (open another console) `$./bin/gen-static`

### depoy to Heroku

- In `.gitignore`, remove `static/dist/` and `webpack-stats.json`

- In `package.json`, modify “betterScripts” as follows:

``` 
"betterScripts": {
    "start": {
      "command": "node ./bin/server.js",
      "env": {
        "NODE_PATH": "./src",
        "NODE_ENV": “production"
      }
    },
```
- `$npm run build`, then commit and push to your heroku repository.


### note

The site was base on this template: [https://github.com/erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) @ 0.0.4

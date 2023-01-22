# linzklar-mincho

[たもと](https://twitter.com/tamoto_0x0)さんの燐字明朝体グリフをフォントに切り分ける

![](https://raw.githubusercontent.com/sozysozbot/linzklar-mincho/master/linmarn.svg)


## 成果物

### フォントファイル
`fonts/` 以下に ttf と woff が置いてある。

### 切り分けられた svg ファイルたち
`glyphs/` 以下に `{漢字転写}.svg` が置いてある。

### 他の字体との比較
[linzi_image_table_narrow.html](http://jurliyuuri.com/lin-marn/linzi_image_table_narrow.html) で見るのが手っ取り早い

## 以下開発者用情報

### 経緯
https://github.com/AIL-MO-LETI-CEP/issues/issues/117

### グリフの生成方法
npm を入れ、`npm install` してから `node split.js` を走らせることで、 `linmarn.svg` が分割され、それぞれが `glyphs` に入る

### フォントの生成
`node to_font.js`


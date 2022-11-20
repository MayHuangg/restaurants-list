# restaurants-list

此專案提供使用者瀏覽與搜尋各餐廳的基本資料。

## Features

- 使用者能瀏覽餐廳資訊。
- 使用者輸入關鍵字後，能得到餐廳名稱或餐廳分類與關鍵字相符的店家資訊。
- 使用者可以新增/修改/刪除餐廳資訊。

## Installation

1.下載專案

```
git clone https://github.com/MayHuangg/restaurants-list
cd restaurants-list
npm install
```

2.設定環境變數連線至 MongoDB

```
MONGODB_URI = mongodb+srv://alpha:camp@cluster0.spwrmxz.mongodb.net/?retryWrites=true&w=majority
```

3.輸入

```
npm run start
```

若看到此訊息代表順利運行

```
listen on port: 3000
mongodb connect
```

4.輸入

```
npm run seed
```

可新增種子資料

5.進入 http://localhost:3000 即可使用此專案。

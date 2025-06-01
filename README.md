# ステメモ

## サッと書いて捨てる、簡易メモアプリ。

オブジェクト指向UIを意識した直感的に操作可能なメモアプリ。<br />
ちょっとした用事やお買い物のメモに便利です。<br />
アイテムの並べ替え機能があるので、優先順位をつけたToDoアプリとして使うこともできます。<br />
Undo/Redo機能もあり、操作を誤ったときに元に戻すことができます。

- URL：https://www.sutememo.vegetstudios.com
- 形式：プログレッシブウェブアプリ (PWA)
- データ保存場所：IndexedDB
- 使用技術：React/Next.js・TypeScript・Tailwind CSS・Radix UI
- 機能：アイテム追加/編集/削除・並べ替え・Undo/Redo・テーマカラー/モード設定

[![ステメモのアイコン](https://github.com/thasegawadesign/sutememo/blob/main/public/icons/rounded-app-icon-192x192.png)](https://www.sutememo.vegetstudios.com)

## 開発について

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev
```

開発中は http://localhost:3000 にアクセス。

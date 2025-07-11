# SILVA Card Game - デプロイメントガイド

## GitHub Pages でのデプロイ

### 1. GitHubリポジトリの設定

1. GitHubで新しいリポジトリを作成
2. このプロジェクトをpush
3. Settings > Pages でソースブランチを選択

### 2. ローカル開発サーバー

```bash
# Python 3 を使用
python3 -m http.server 8000

# または npm scripts を使用
npm run start
```

ブラウザで `http://localhost:8000` にアクセス

### 3. ファイル構成

```
silva8/
├── index.html          # メインHTMLファイル
├── css/
│   └── styles.css      # メインCSSファイル
├── js/
│   ├── main.js         # メインJavaScript
│   ├── components.js   # コンポーネント機能
│   └── animations.js   # アニメーション機能
├── images/
│   ├── 1.png - 11.png  # カード画像
│   └── back.png        # カード裏面
├── README.md           # プロジェクト説明
├── package.json        # NPM設定
└── .gitignore          # Git除外設定
```

### 4. レスポンシブ対応

- デスクトップ: フル機能
- タブレット: 4列/3列レイアウト
- モバイル: 1列レイアウト

### 5. ブラウザサポート

- Chrome (推奨)
- Firefox
- Safari
- Edge
- モバイルブラウザ

### 6. パフォーマンス最適化

- CSS Grid レイアウト
- 画像最適化済み
- 軽量JavaScript
- キャッシュ戦略

## 本番環境での注意点

1. **画像ファイル**: すべてのカード画像が正しくアップロードされているか確認
2. **相対パス**: すべてのリンクが相対パスになっているか確認
3. **HTTPS**: 本番環境ではHTTPS必須
4. **SEO**: meta タグが適切に設定されているか確認

## トラブルシューティング

### 画像が表示されない場合
- ファイルパスを確認
- ファイル名の大文字小文字を確認
- 画像ファイルが存在するか確認

### レスポンシブレイアウトが崩れる場合
- viewport meta タグを確認
- CSS Grid のブラウザサポートを確認

### JavaScript エラーが出る場合
- ブラウザの開発者ツールでエラーログを確認
- 古いブラウザでの互換性を確認
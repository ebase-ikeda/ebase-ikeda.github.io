# 基礎イメージ更新（Node.jsのバージョンを14かそれ以上に）
FROM node:20-alpine

# 必要なライブラリをインストール
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

WORKDIR /app

# アプリケーションの依存関係をインストール
COPY package*.json ./
RUN npm install && npm install gulp-cli -g

# プロジェクトファイルをコピー
COPY . .

# コンテナがリッスンするポート番号を指定
# EXPOSE 3000

# Gulpを起動コマンドとして実行
# CMD ["gulp"]


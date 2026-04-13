#!/bin/bash
# 뉴픽 Todo — Git Push 스크립트 (Mac/Linux)
# 사용법: ./push.sh "커밋 메시지"

TOKEN_FILE="$HOME/Desktop/ToDo/token.txt"
PROJECT_DIR="$(dirname "$0")"
REPO="christopher985/newpeak-planner"

if [ ! -f "$TOKEN_FILE" ]; then
  echo "❌ token.txt 를 찾을 수 없습니다: $TOKEN_FILE"
  exit 1
fi

TOKEN=$(cat "$TOKEN_FILE" | tr -d '[:space:]')
MSG="${1:-update}"

cd "$PROJECT_DIR"
git remote set-url origin "https://christopher985:${TOKEN}@github.com/${REPO}.git"
git add .
git commit -m "$MSG"
git push origin main
echo "✅ DONE — Netlify 자동 배포 시작됨"

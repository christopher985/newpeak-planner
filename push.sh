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

TOKEN=$(grep -m1 '^ghp_' "$TOKEN_FILE" | tr -d '[:space:]')
if [ -z "$TOKEN" ]; then
  echo "❌ token.txt 에서 GitHub PAT (ghp_ 로 시작) 을 찾을 수 없습니다"
  exit 1
fi
MSG="${1:-update}"

cd "$PROJECT_DIR"
git remote set-url origin "https://christopher985:${TOKEN}@github.com/${REPO}.git"
git add .
git commit -m "$MSG"
git push origin main
PUSH_EXIT=$?
if [ $PUSH_EXIT -eq 0 ]; then
  echo "✅ DONE — Netlify 자동 배포 시작됨"
else
  echo "❌ git push 실패 (exit=$PUSH_EXIT)"
  exit $PUSH_EXIT
fi

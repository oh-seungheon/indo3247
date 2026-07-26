# 부안 닭축제 제안서 v4 — 빌드 패키지

## 실행
```bash
npm install pptxgenjs      # 최초 1회
node build.js              # 부안닭축제_제안서_v4.pptx 생성
```

## 폰트
`Noto Sans KR` 사용. 미설치 시 `lib.js` 의 `const F = 'Noto Sans KR';` 를
`'맑은 고딕'` 으로 변경하세요.

## 구조 (총 31장)
```
lib.js     디자인 시스템 (컬러/타이포/그리드/헤더/배너/이미지)
part1.js   표지 · 목차 · S1~S7 (지역브랜드 포함)
part2.js   S8~S15 (닭의 역사 · 사업계획)
part3.js   S16~S21 + 예산 계획 · 추진 체계 신설 · 결론
build.js   진입점
images/    사진 폴더 (이미지_요청서.md 참고)
```

## 수정 지점
| 대상 | 위치 |
|---|---|
| 컬러 | `lib.js` 의 `C` |
| 폰트 | `lib.js` 의 `F` |
| 폰트 크기 | `lib.js` 의 `T` |
| 여백·그리드 | `lib.js` 의 `G` |
| 슬라이드 내용 | `part1~3.js` |

## 캔버스
20″ × 11.25″ (템플릿과 동일 스케일)

## 검증
```bash
python3 $SK/office/validate.py 부안닭축제_제안서_v4.pptx
python3 $SK/office/soffice.py --headless --convert-to pdf 부안닭축제_제안서_v4.pptx
pdftoppm -jpeg -r 130 부안닭축제_제안서_v4.pdf slide
# 29장 전부 육안 확인
```

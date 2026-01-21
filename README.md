# Vitest 온보딩 프로젝트 문서 패키지

## 📋 문서 목록

| 파일명                             | 용도                         | 대상           |
| ---------------------------------- | ---------------------------- | -------------- |
| `01-PRD-TaskFlow.md`               | 제품 요구사항 명세서         | 기획/개발 전체 |
| `02-TRD-TaskFlow.md`               | 기술 요구사항 명세서         | 개발팀         |
| `03-AI-Prompt-Templates.md`        | AI 테스트 코드 생성 프롬프트 | 개발팀         |
| `04-Commit-Schedule.md`            | 커밋 단위 작업 일정표        | 개발팀         |
| `05-Vitest-Implementation-Plan.md` | Vitest 적용 계획서           | 리드/매니저    |

---

## 🚀 빠른 시작 가이드

### 1단계: 문서 검토 순서

```
1. 05-Vitest-Implementation-Plan.md  ← 전체 전략 이해
2. 01-PRD-TaskFlow.md                ← 프로젝트 요구사항 확인
3. 02-TRD-TaskFlow.md                ← 기술 스펙 확인
4. 04-Commit-Schedule.md             ← 작업 일정 확인
5. 03-AI-Prompt-Templates.md         ← 테스트 코드 생성 시 활용
```

### 2단계: 프로젝트 시작

```bash
# 1. 프로젝트 생성
npm create vite@latest taskflow -- --template vue
cd taskflow

# 2. 의존성 설치
npm install pinia vue-router axios
npm install -D vitest @vue/test-utils jsdom @vitest/coverage-v8 @vitest/ui msw

# 3. 첫 테스트 실행
npm run test
```

### 3단계: AI 활용 테스트 코드 생성

1. `03-AI-Prompt-Templates.md`에서 적절한 템플릿 선택
2. 실제 코드를 템플릿에 삽입
3. AI에게 요청하여 테스트 코드 초안 생성
4. 생성된 코드 리뷰 및 수정

---

## 📁 권장 프로젝트 구조

```
taskflow/
├── docs/                     # ← 이 문서들을 여기에 배치
│   ├── PRD.md
│   ├── TRD.md
│   └── ...
├── src/
│   ├── components/
│   ├── stores/
│   ├── router/
│   └── api/
├── tests/
│   ├── setup.js
│   ├── unit/
│   ├── integration/
│   └── mocks/
└── vitest.config.js
```

---

## 🎯 핵심 활용 시나리오

### 시나리오 1: 새 컴포넌트 개발

```
1. TRD에서 컴포넌트 명세 확인
2. 컴포넌트 코드 작성
3. AI 프롬프트 템플릿 사용하여 테스트 초안 생성
4. 테스트 코드 리뷰 및 보완
5. Commit Schedule에 따라 커밋
```

### 시나리오 2: 기존 코드에 테스트 추가

```
1. Implementation Plan에서 우선순위 확인
2. 테스트 대상 코드 분석
3. AI 프롬프트로 테스트 초안 생성
4. MSW 핸들러 작성 (API 관련 시)
5. 테스트 실행 및 커버리지 확인
```

### 시나리오 3: 온보딩 진행

```
1. PRD로 프로젝트 목표 공유
2. TRD로 기술 스택 설명
3. Commit Schedule 순서대로 학습
4. 각 커밋마다 학습 포인트 토론
5. AI 프롬프트로 연습 테스트 작성
```

---

## ✅ 체크리스트

### 프로젝트 시작 전

- [ ] 모든 문서 검토 완료
- [ ] 팀원 역할 분담 완료
- [ ] 개발 환경 통일 (Node.js, VS Code 등)
- [ ] Git 브랜치 전략 합의

### 매주 확인

- [ ] 커밋 스케줄 진행 상황
- [ ] 테스트 커버리지
- [ ] 팀원 질의응답 정리
- [ ] 다음 주 계획 확인

### 프로젝트 완료 시

- [ ] 커버리지 80% 달성
- [ ] CI/CD 파이프라인 동작
- [ ] 테스트 가이드 문서화
- [ ] 팀 회고 진행

---

## 📞 문의

문서 관련 질문이나 개선 제안은 프론트엔드 리드에게 문의하세요.

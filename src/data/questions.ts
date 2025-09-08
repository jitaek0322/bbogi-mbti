import type { Axis } from '../lib/mbti'

export type Choice = { label: string; add: Partial<Record<Axis, number>> }
export type Question = { id: string; title: string; choices: [Choice, Choice] }

// 총 30문항 풀. 퀴즈 시작 시 여기에서 12문항을 랜덤 샘플링합니다.
export const QUESTIONS_POOL: Question[] = [
  { id: 'q1', title: '처음 가는 축제, 나는?', choices: [
    { label: '사람들 사이로 먼저 뛰어든다', add: { E: 1 } },
    { label: '구석에서 전체 분위기를 살핀다', add: { I: 1 } },
  ]},
  { id: 'q2', title: '친구와 약속은', choices: [
    { label: '즉흥적으로도 좋다', add: { P: 1 } },
    { label: '미리 계획대로 움직여야 편하다', add: { J: 1 } },
  ]},
  { id: 'q3', title: '떡볶이 주문할 때 나는', choices: [
    { label: '신메뉴, 색다른 조합 시도', add: { N: 1 } },
    { label: '검증된 베스트 메뉴로', add: { S: 1 } },
  ]},
  { id: 'q4', title: '친구 고민 상담엔', choices: [
    { label: '사실/해결책 위주로 조언', add: { T: 1 } },
    { label: '감정 공감부터', add: { F: 1 } },
  ]},
  { id: 'q5', title: '일정을 소화하는 방식', choices: [
    { label: '유연하게, 현장 분위기 따라', add: { P: 1 } },
    { label: '체크리스트로 하나씩 완료', add: { J: 1 } },
  ]},
  { id: 'q6', title: '모임에서 나는', choices: [
    { label: '이야기의 불씨를 붙이는 타입', add: { E: 1 } },
    { label: '필요할 때만 말하는 타입', add: { I: 1 } },
  ]},
  { id: 'q7', title: '정보를 받아들이는 기준', choices: [
    { label: '경험/사실을 중시', add: { S: 1 } },
    { label: '패턴/가능성을 본다', add: { N: 1 } },
  ]},
  { id: 'q8', title: '떡볶이 국물 농도 취향', choices: [
    { label: '걸쭉하고 진한 게 최고', add: { J: 1, S: 1 } },
    { label: '가볍고 라이트하게', add: { P: 1, N: 1 } },
  ]},
  { id: 'q9', title: '갈등 상황에서', choices: [
    { label: '원인 분석 → 해결책 제시', add: { T: 1 } },
    { label: '상대 마음 다독이기 우선', add: { F: 1 } },
  ]},
  { id: 'q10', title: '계획의 변화가 생기면', choices: [
    { label: '새로 나온 선택지부터 검토', add: { N: 1, P: 1 } },
    { label: '원래 계획 유지가 마음 편함', add: { S: 1, J: 1 } },
  ]},
  { id: 'q11', title: '축제 맛집 추천을 받으면', choices: [
    { label: '사람 많은 곳도 도전!', add: { E: 1 } },
    { label: '한적한 숨은 곳이 좋다', add: { I: 1 } },
  ]},
  { id: 'q12', title: '주문 순간, 마지막 선택은', choices: [
    { label: '치즈·로제·튀김 토핑 잔뜩!', add: { F: 1, N: 1 } },
    { label: '기본에 충실: 국물·면 사리 정확히', add: { T: 1, S: 1 } },
  ]},
  { id: 'q13', title: '새로운 프로젝트 제안이 왔다!', choices: [
    { label: '일단 시작하며 배우자', add: { P: 1, E: 1 } },
    { label: '요건/리스크부터 정리', add: { J: 1, T: 1 } },
  ]},
  { id: 'q14', title: '사진 찍을 때 나는', choices: [
    { label: '인물·감정 위주로 구도', add: { F: 1, N: 1 } },
    { label: '구조·대칭·정보 위주', add: { T: 1, S: 1 } },
  ]},
  { id: 'q15', title: '떡볶이 매운맛 단계', choices: [
    { label: '강하게! 땀 흘려야 제맛', add: { E: 1, T: 1 } },
    { label: '적당히! 맛과 편안함 우선', add: { I: 1, F: 1 } },
  ]},
  { id: 'q16', title: '휴일 계획', choices: [
    { label: '즉흥 로드트립', add: { P: 1, N: 1 } },
    { label: '체크리스트로 알차게', add: { J: 1, S: 1 } },
  ]},
  { id: 'q17', title: '문제 해결 방식', choices: [
    { label: '새로운 시도로 돌파', add: { N: 1 } },
    { label: '기존 검증법을 따른다', add: { S: 1 } },
  ]},
  { id: 'q18', title: '대화에서 나는', choices: [
    { label: '핵심·결론 먼저', add: { T: 1 } },
    { label: '상대 기분·맥락을 본다', add: { F: 1 } },
  ]},
  { id: 'q19', title: '선물 고를 때', choices: [
    { label: '특별하고 유니크한 것', add: { N: 1 } },
    { label: '실용적이고 검증된 것', add: { S: 1 } },
  ]},
  { id: 'q20', title: '회의 스타일', choices: [
    { label: '브레인스토밍이 먼저', add: { E: 1, N: 1 } },
    { label: '아젠다·결정이 먼저', add: { I: 1, J: 1 } },
  ]},
  { id: 'q21', title: '떡볶이 재료 추가', choices: [
    { label: '의외의 토핑도 시도', add: { N: 1, P: 1 } },
    { label: '표준 토핑이 안정감', add: { S: 1, J: 1 } },
  ]},
  { id: 'q22', title: '여행지 선택', choices: [
    { label: '사람 북적이는 핫플', add: { E: 1 } },
    { label: '조용한 로컬', add: { I: 1 } },
  ]},
  { id: 'q23', title: '시간 압박이 올 때', choices: [
    { label: '애자일하게 우선순위 재편', add: { P: 1 } },
    { label: '원래 계획을 더 타이트하게', add: { J: 1 } },
  ]},
  { id: 'q24', title: '문서/디자인 취향', choices: [
    { label: '감성/컨셉이 중요', add: { F: 1, N: 1 } },
    { label: '정확성/일관성이 중요', add: { T: 1, S: 1 } },
  ]},
  { id: 'q25', title: '처음 만난 사람 앞에서', choices: [
    { label: '에너지 높게 분위기 메이커', add: { E: 1 } },
    { label: '차분하게 상황을 본다', add: { I: 1 } },
  ]},
  { id: 'q26', title: '아이디어 검증', choices: [
    { label: '작게 시도하며 배운다', add: { P: 1 } },
    { label: '체계적 계획 후 실행', add: { J: 1 } },
  ]},
  { id: 'q27', title: '분식집 좌석 고르기', choices: [
    { label: '오픈키친 근처 활기찬 자리', add: { E: 1, S: 1 } },
    { label: '창가·구석 차분한 자리', add: { I: 1, N: 1 } },
  ]},
  { id: 'q28', title: '단톡방 스타일', choices: [
    { label: '밈·짤 적극 투척', add: { E: 1, P: 1 } },
    { label: '필요할 때만 실제 정보', add: { I: 1, J: 1 } },
  ]},
  { id: 'q29', title: '맛 평가 기준', choices: [
    { label: '첫인상/임팩트가 중요', add: { N: 1, F: 1 } },
    { label: '균형/재현성/완성도', add: { S: 1, T: 1 } },
  ]},
  { id: 'q30', title: '후식 선택', choices: [
    { label: '새로운 디저트 탐험', add: { N: 1 } },
    { label: '익숙한 베스트', add: { S: 1 } },
  ]},
]

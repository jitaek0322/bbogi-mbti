import type { Axis } from '../lib/mbti'

export type Choice = { label: string; add: Partial<Record<Axis, number>> }
export type Question = { id: string; title: string; choices: [Choice, Choice] }

// 총 50문항 풀. 퀴즈 시작 시 여기에서 12문항을 랜덤 샘플링합니다.
export const QUESTIONS_POOL: Question[] = [
  { id: 'q1', title: '처음 가는 축제, 나는?', choices: [
    { label: '사람들 속으로 먼저 들어간다', add: { E: 1 } },
    { label: '구석에서 분위기를 살핀다', add: { I: 1 } },
  ]},
  { id: 'q2', title: '친구와 약속은', choices: [
    { label: '즉흥적으로도 괜찮다', add: { P: 1 } },
    { label: '계획대로 움직여야 편하다', add: { J: 1 } },
  ]},
  { id: 'q3', title: '떡볶이 주문할 때 나는', choices: [
    { label: '새로운 조합을 시도한다', add: { N: 1 } },
    { label: '인기 메뉴 위주로 고른다', add: { S: 1 } },
  ]},
  { id: 'q4', title: '친구 고민을 들어줄 때 나는', choices: [
    { label: '해결 방법을 알려준다', add: { T: 1 } },
    { label: '마음을 공감해준다', add: { F: 1 } },
  ]},
  { id: 'q5', title: '일정을 소화할 때 나는', choices: [
    { label: '그때그때 분위기에 맞춘다', add: { P: 1 } },
    { label: '체크리스트대로 움직인다', add: { J: 1 } },
  ]},
  { id: 'q6', title: '모임에서 나는', choices: [
    { label: '먼저 말을 꺼내는 타입', add: { E: 1 } },
    { label: '필요할 때만 말하는 타입', add: { I: 1 } },
  ]},
  { id: 'q7', title: '정보를 볼 때 나는', choices: [
    { label: '사실과 경험을 중시한다', add: { S: 1 } },
    { label: '패턴과 가능성을 본다', add: { N: 1 } },
  ]},
  { id: 'q8', title: '떡볶이 국물 취향', choices: [
    { label: '걸쭉하고 진한 게 좋다', add: { J: 1, S: 1 } },
    { label: '가볍고 산뜻한 게 좋다', add: { P: 1, N: 1 } },
  ]},
  { id: 'q9', title: '갈등 상황에서 나는', choices: [
    { label: '문제 원인을 분석하고 해결책을 낸다', add: { T: 1 } },
    { label: '상대 마음을 먼저 다독인다', add: { F: 1 } },
  ]},
  { id: 'q10', title: '계획이 바뀌면 나는', choices: [
    { label: '새로운 선택지를 먼저 살펴본다', add: { N: 1, P: 1 } },
    { label: '원래 계획을 지키는 게 편하다', add: { S: 1, J: 1 } },
  ]},
  { id: 'q11', title: '축제 맛집 추천을 받으면', choices: [
    { label: '줄이 길어도 도전한다', add: { E: 1 } },
    { label: '한적한 숨은 맛집을 찾는다', add: { I: 1 } },
  ]},
  { id: 'q12', title: '마지막 주문 선택은', choices: [
    { label: '치즈·토핑 듬뿍 추가', add: { F: 1, N: 1 } },
    { label: '기본에 충실하게 주문', add: { T: 1, S: 1 } },
  ]},
  { id: 'q13', title: '새로운 프로젝트 제안이 왔다!', choices: [
    { label: '일단 해보면서 배운다', add: { P: 1, E: 1 } },
    { label: '먼저 조건과 위험을 따진다', add: { J: 1, T: 1 } },
  ]},
  { id: 'q14', title: '사진 찍을 때 나는', choices: [
    { label: '감정과 분위기를 담는다', add: { F: 1, N: 1 } },
    { label: '구조와 균형을 맞춘다', add: { T: 1, S: 1 } },
  ]},
  { id: 'q15', title: '떡볶이 매운맛 단계', choices: [
    { label: '아주 매운 맛 도전!', add: { E: 1, T: 1 } },
    { label: '적당히 맛있게 즐긴다', add: { I: 1, F: 1 } },
  ]},
  { id: 'q16', title: '휴일 계획', choices: [
    { label: '즉흥 여행 떠난다', add: { P: 1, N: 1 } },
    { label: '계획 세워 알차게 보낸다', add: { J: 1, S: 1 } },
  ]},
  { id: 'q17', title: '문제 해결 방식', choices: [
    { label: '새로운 방법으로 도전한다', add: { N: 1 } },
    { label: '검증된 방법을 따른다', add: { S: 1 } },
  ]},
  { id: 'q18', title: '대화에서 나는', choices: [
    { label: '핵심부터 말한다', add: { T: 1 } },
    { label: '상대 기분을 먼저 살핀다', add: { F: 1 } },
  ]},
  { id: 'q19', title: '선물 고를 때 나는', choices: [
    { label: '특별하고 독특한 걸 고른다', add: { N: 1 } },
    { label: '실용적이고 무난한 걸 고른다', add: { S: 1 } },
  ]},
  { id: 'q20', title: '회의할 때 나는', choices: [
    { label: '아이디어부터 자유롭게 나눈다', add: { E: 1, N: 1 } },
    { label: '안건과 결정을 먼저 정한다', add: { I: 1, J: 1 } },
  ]},
  { id: 'q21', title: '떡볶이 토핑 추가', choices: [
    { label: '색다른 토핑도 시도한다', add: { N: 1, P: 1 } },
    { label: '기본 토핑이 안정감 있다', add: { S: 1, J: 1 } },
  ]},
  { id: 'q22', title: '여행지 선택', choices: [
    { label: '사람 많은 인기 장소', add: { E: 1 } },
    { label: '조용한 로컬 명소', add: { I: 1 } },
  ]},
  { id: 'q23', title: '시간에 쫓길 때 나는', choices: [
    { label: '순위를 바꿔가며 빠르게 처리', add: { P: 1 } },
    { label: '원래 계획을 더 빡빡하게 실행', add: { J: 1 } },
  ]},
  { id: 'q24', title: '문서나 디자인 취향', choices: [
    { label: '감성과 분위기가 중요하다', add: { F: 1, N: 1 } },
    { label: '정확성과 일관성이 중요하다', add: { T: 1, S: 1 } },
  ]},
  { id: 'q25', title: '처음 만난 사람 앞에서 나는', choices: [
    { label: '분위기를 띄운다', add: { E: 1 } },
    { label: '조용히 상황을 지켜본다', add: { I: 1 } },
  ]},
  { id: 'q26', title: '아이디어 검증 방식', choices: [
    { label: '작게 시도하면서 배운다', add: { P: 1 } },
    { label: '계획을 세운 뒤 실행한다', add: { J: 1 } },
  ]},
  { id: 'q27', title: '분식집 자리 고르기', choices: [
    { label: '주방 옆 활기찬 자리', add: { E: 1, S: 1 } },
    { label: '창가나 구석 조용한 자리', add: { I: 1, N: 1 } },
  ]},
  { id: 'q28', title: '단톡방에서 나는', choices: [
    { label: '밈이나 짤 자주 올린다', add: { E: 1, P: 1 } },
    { label: '필요할 때만 정보 공유', add: { I: 1, J: 1 } },
  ]},
  { id: 'q29', title: '맛 평가 기준', choices: [
    { label: '첫인상과 임팩트', add: { N: 1, F: 1 } },
    { label: '균형과 완성도', add: { S: 1, T: 1 } },
  ]},
  { id: 'q30', title: '후식 선택', choices: [
    { label: '새로운 디저트 도전', add: { N: 1 } },
    { label: '익숙한 베스트 메뉴', add: { S: 1 } },
  ]},

  // 여기서부터 추가된 20문항
  { id: 'q31', title: '길을 잃었을 때 나는', choices: [
    { label: '일단 돌아다니며 길을 찾는다', add: { P: 1 } },
    { label: '지도를 꺼내 정확히 확인한다', add: { J: 1 } },
  ]},
  { id: 'q32', title: '새로운 사람과 대화할 때 나는', choices: [
    { label: '먼저 말을 건다', add: { E: 1 } },
    { label: '상대가 말 걸기를 기다린다', add: { I: 1 } },
  ]},
  { id: 'q33', title: '메뉴판을 볼 때 나는', choices: [
    { label: '평소 안 먹던 걸 시도', add: { N: 1 } },
    { label: '늘 먹던 걸 고른다', add: { S: 1 } },
  ]},
  { id: 'q34', title: '문제가 생겼을 때 나는', choices: [
    { label: '원인을 따져 해결책을 찾는다', add: { T: 1 } },
    { label: '주변 사람의 기분을 먼저 생각한다', add: { F: 1 } },
  ]},
  { id: 'q35', title: '모임 약속 시간에 늦었을 때 나는', choices: [
    { label: '즉시 전화해 상황을 설명한다', add: { J: 1 } },
    { label: '일단 가면서 대처한다', add: { P: 1 } },
  ]},
  { id: 'q36', title: '여행 준비할 때 나는', choices: [
    { label: '즉흥적으로 짐 챙긴다', add: { P: 1 } },
    { label: '체크리스트대로 꼼꼼히 챙긴다', add: { J: 1 } },
  ]},
  { id: 'q37', title: '친구가 힘들다고 하면 나는', choices: [
    { label: '해결 방안을 같이 찾는다', add: { T: 1 } },
    { label: '마음을 먼저 위로한다', add: { F: 1 } },
  ]},
  { id: 'q38', title: '새로운 게임이 나오면 나는', choices: [
    { label: '바로 해보며 익힌다', add: { P: 1 } },
    { label: '공략법을 먼저 찾아본다', add: { J: 1 } },
  ]},
  { id: 'q39', title: '식당에서 자리 고를 때 나는', choices: [
    { label: '사람들과 가까운 자리에 앉는다', add: { E: 1 } },
    { label: '조용한 자리를 찾는다', add: { I: 1 } },
  ]},
  { id: 'q40', title: '영화를 볼 때 나는', choices: [
    { label: '상상력이 풍부한 스토리를 좋아한다', add: { N: 1 } },
    { label: '현실감 있는 이야기를 좋아한다', add: { S: 1 } },
  ]},
  { id: 'q41', title: '대화 중 의견 차이가 날 때 나는', choices: [
    { label: '논리적으로 설득한다', add: { T: 1 } },
    { label: '상대 기분을 상하지 않게 한다', add: { F: 1 } },
  ]},
  { id: 'q42', title: '팀 프로젝트에서 나는', choices: [
    { label: '아이디어를 많이 낸다', add: { E: 1 } },
    { label: '묵묵히 맡은 일을 한다', add: { I: 1 } },
  ]},
  { id: 'q43', title: '카페에서 음료를 고를 때 나는', choices: [
    { label: '새로운 메뉴에 도전한다', add: { N: 1 } },
    { label: '늘 먹던 메뉴를 고른다', add: { S: 1 } },
  ]},
  { id: 'q44', title: '숙제를 할 때 나는', choices: [
    { label: '마감 직전에 몰아서 한다', add: { P: 1 } },
    { label: '미리 계획해 나눠서 한다', add: { J: 1 } },
  ]},
  { id: 'q45', title: '친구들과 모일 때 나는', choices: [
    { label: '대화를 주도한다', add: { E: 1 } },
    { label: '대화를 듣는 편이다', add: { I: 1 } },
  ]},
  { id: 'q46', title: '새로운 음식이 보이면 나는', choices: [
    { label: '한번쯤 시도해본다', add: { N: 1 } },
    { label: '익숙한 음식이 더 끌린다', add: { S: 1 } },
  ]},
  { id: 'q47', title: '약속 시간이 다가올 때 나는', choices: [
    { label: '시간에 맞춰 딱 간다', add: { J: 1 } },
    { label: '상황 봐서 조금 늦을 수도 있다', add: { P: 1 } },
  ]},
  { id: 'q48', title: '팀워크에서 나는', choices: [
    { label: '분위기를 띄우는 역할', add: { E: 1, F: 1 } },
    { label: '조용히 뒷받침하는 역할', add: { I: 1, S: 1 } },
  ]},
  { id: 'q49', title: '새로운 아이디어가 떠오르면 나는', choices: [
    { label: '바로 실행에 옮긴다', add: { P: 1, N: 1 } },
    { label: '먼저 검토하고 정리한다', add: { J: 1, S: 1 } },
  ]},
  { id: 'q50', title: '축제에서 즐기는 방식', choices: [
    { label: '사람들과 함께 뛰어논다', add: { E: 1 } },
    { label: '조용히 구경하며 즐긴다', add: { I: 1 } },
  ]},
    { id: 'q51', title: '축제 부스 탐방할 때 나는', choices: [
    { label: '여기저기 다 둘러본다', add: { E: 1, P: 1 } },
    { label: '딱 마음에 드는 곳만 간다', add: { I: 1, J: 1 } },
  ]},
  { id: 'q52', title: '떡볶이 페스티벌에 가면 나는', choices: [
    { label: '핫한 신메뉴 먼저 찾는다', add: { N: 1 } },
    { label: '늘 인기 많은 메뉴로 간다', add: { S: 1 } },
  ]},
  { id: 'q53', title: '축제 공연 시작 전 나는', choices: [
    { label: '앞자리로 달려간다', add: { E: 1 } },
    { label: '뒤에서 여유롭게 본다', add: { I: 1 } },
  ]},
  { id: 'q54', title: '분식집에서 떡볶이를 시킬 때 나는', choices: [
    { label: '사리·토핑 다 넣는다', add: { F: 1, N: 1 } },
    { label: '기본 떡볶이만 주문한다', add: { T: 1, S: 1 } },
  ]},
  { id: 'q55', title: '축제 포토존을 보면 나는', choices: [
    { label: '바로 달려가 사진 찍는다', add: { E: 1 } },
    { label: '사람 빠질 때까지 기다린다', add: { I: 1 } },
  ]},
  { id: 'q56', title: '떡볶이 국물 색깔은', choices: [
    { label: '빨갛고 자극적인 게 좋다', add: { E: 1, T: 1 } },
    { label: '은은하고 순한 게 좋다', add: { I: 1, F: 1 } },
  ]},
  { id: 'q57', title: '축제 프로그램을 고를 때 나는', choices: [
    { label: '재미있어 보이는 건 다 참여한다', add: { P: 1 } },
    { label: '내 취향 맞는 것만 참여한다', add: { J: 1 } },
  ]},
  { id: 'q58', title: '친구랑 분식집에 가면 나는', choices: [
    { label: '새로운 메뉴 나눠 먹자고 한다', add: { N: 1 } },
    { label: '늘 먹는 메뉴를 같이 먹는다', add: { S: 1 } },
  ]},
  { id: 'q59', title: '야시장 분위기에서는 나는', choices: [
    { label: '사람들과 어울려 떠든다', add: { E: 1 } },
    { label: '조용히 먹거리만 즐긴다', add: { I: 1 } },
  ]},
  { id: 'q60', title: '떡볶이 먹을 때 나는', choices: [
    { label: '매운맛 도전 정신이 있다', add: { T: 1 } },
    { label: '편안하게 먹는 게 더 좋다', add: { F: 1 } },
  ]},
  { id: 'q61', title: '축제에서 길거리 공연을 보면 나는', choices: [
    { label: '앞에서 같이 즐긴다', add: { E: 1 } },
    { label: '멀리서 조용히 구경한다', add: { I: 1 } },
  ]},
  { id: 'q62', title: '떡볶이 페스티벌 쿠폰북을 받으면 나는', choices: [
    { label: '모든 부스를 다 찍어본다', add: { N: 1, P: 1 } },
    { label: '내가 좋아하는 곳만 고른다', add: { S: 1, J: 1 } },
  ]},
  { id: 'q63', title: '축제에서 줄이 길면 나는', choices: [
    { label: '그래도 기다린다', add: { J: 1 } },
    { label: '다른 부스부터 간다', add: { P: 1 } },
  ]},
  { id: 'q64', title: '분식집 음료를 고를 때 나는', choices: [
    { label: '새로운 음료를 시도한다', add: { N: 1 } },
    { label: '익숙한 음료를 고른다', add: { S: 1 } },
  ]},
  { id: 'q65', title: '축제 퀴즈 이벤트에 참여할 때 나는', choices: [
    { label: '틀려도 즐겁게 도전한다', add: { P: 1, E: 1 } },
    { label: '신중히 고민해서 답을 고른다', add: { J: 1, I: 1 } },
  ]},
  { id: 'q66', title: '분식집에서 자주 하는 행동은', choices: [
    { label: '사람들과 나눠 먹는다', add: { F: 1 } },
    { label: '내 몫만 챙겨 먹는다', add: { T: 1 } },
  ]},
  { id: 'q67', title: '축제 일정표를 보면 나는', choices: [
    { label: '모든 프로그램 체크!', add: { J: 1 } },
    { label: '그때그때 가고 싶은 데로', add: { P: 1 } },
  ]},
  { id: 'q68', title: '떡볶이 소스를 고를 수 있다면 나는', choices: [
    { label: '신상 소스를 고른다', add: { N: 1 } },
    { label: '기본 소스를 고른다', add: { S: 1 } },
  ]},
  { id: 'q69', title: '축제 분위기가 너무 붐비면 나는', choices: [
    { label: '신나서 더 즐긴다', add: { E: 1 } },
    { label: '조용한 곳으로 피한다', add: { I: 1 } },
  ]},
  { id: 'q70', title: '떡볶이를 같이 먹을 때 나는', choices: [
    { label: '다양한 소스와 토핑을 섞는다', add: { N: 1, F: 1 } },
    { label: '정해진 조합을 지킨다', add: { S: 1, T: 1 } },
  ]},
]

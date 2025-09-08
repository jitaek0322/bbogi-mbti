export type ResultInfo = {
  title: string
  desc: string
  hashtags: string[]
  image: string // path under /public/images
}

export const RESULT_MAP: Record<string, ResultInfo> = {
  ENFJ: { title: '로제 크림 리더', desc: '따뜻한 추진력으로 모두를 이끄는 당신에게 달콤매콤 로제가 딱!', hashtags: ['#로제', '#리더', '#달콤매콤'], image: '/images/ENFJ.png' },
  ENFP: { title: '자유분방 페스티벌러', desc: '새로운 조합도 거침없이! 튀김+치즈까지 한가득.', hashtags: ['#자유', '#튀치조합', '#인싸'], image: '/images/ENFP.png' },
  ENTJ: { title: '전략가 불맛', desc: '결정은 빠르게, 불향 강한 매운 떡볶이로 에너지 업!', hashtags: ['#리더십', '#불맛', '#스트롱'], image: '/images/ENTJ.png' },
  ENTP: { title: '아이디어 스파크', desc: '새롭고 재밌는 토핑 조합 연구중. 하프앤하프 어때요?', hashtags: ['#아이디어', '#하프앤하프'], image: '/images/ENTP.png' },
  ESFJ: { title: '케어맛 국물파', desc: '친구 챙기는 인싸케어러! 모두가 좋아하는 국물형 추천.', hashtags: ['#국물파', '#케어'], image: '/images/ESFJ.png' },
  ESFP: { title: '흥폭발 달콤파', desc: '달달매콤한 즉석 떡볶이, 소시지·어묵 추가는 기본!', hashtags: ['#흥', '#즉떡', '#달콤'], image: '/images/ESFP.png' },
  ESTJ: { title: '정석의 맛', desc: '표준은 옳다! 밀떡+중간매운+계란=완벽한 밸런스.', hashtags: ['#정석', '#밸런스'], image: '/images/ESTJ.png' },
  ESTP: { title: '스릴맛 불닭계열', desc: '매운맛 챌린지? 콜! 불향 강한 매운맛으로 스트레스 타파.', hashtags: ['#매운맛', '#도전'], image: '/images/ESTP.png' },
  INFJ: { title: '감성 깊은 크림로제', desc: '부드럽고 여운 있는 맛. 감성 한 스푼 얹은 로제 추천.', hashtags: ['#감성', '#크림로제'], image: '/images/INFJ.png' },
  INFP: { title: '잔잔달콤 감성파', desc: '기본의 묘미를 아는 당신, 은은한 단맛의 국물형 추천.', hashtags: ['#감성', '#은은달콤'], image: '/images/INFP.png' },
  INTJ: { title: '계획적 시그니처', desc: '맛의 구조를 설계한다. 시그니처 메뉴 정석대로.', hashtags: ['#시그니처', '#설계'], image: '/images/INTJ.png' },
  INTP: { title: '분석하는 토핑러', desc: '토핑 조합의 상호작용을 탐구하는 과학자 타입.', hashtags: ['#토핑연구', '#과몰입'], image: '/images/INTP.png' },
  ISFJ: { title: '포근한 할매입맛', desc: '순한 국물·쌀떡 조합으로 편안한 위로를.', hashtags: ['#포근', '#순한맛'], image: '/images/ISFJ.png' },
  ISFP: { title: '차분한 비주얼러', desc: '예쁜 플레이팅이 중요! 크림/치즈로 비주얼 완성.', hashtags: ['#비주얼', '#치즈'], image: '/images/ISFP.png' },
  ISTJ: { title: '근면성실 클래식', desc: '클래식한 분식집 스타일. 어묵·계란은 필수.', hashtags: ['#클래식', '#분식집'], image: '/images/ISTJ.png' },
  ISTP: { title: '쿨한 미니멀', desc: '군더더기 없이 깔끔하게. 달지 않고 칼칼한 맛.', hashtags: ['#미니멀', '#칼칼'], image: '/images/ISTP.png' }
}

// 병원 기본 정보 — 여기 값만 바꾸면 사이트 전체(화면·검색 메타·구조화 데이터)에 반영됩니다.
// 값이 빈 문자열('')인 항목은 화면에서 자동으로 숨겨집니다. 정해지면 채워 넣으세요.

export const site = {
  name: '고려이비인후과',
  legalName: '고려이비인후과의원',
  nameEn: 'Korea ENT Clinic',
  url: 'https://www.djkoreaent.co.kr',
  openDate: '2026-12-28',
  openDateLabel: '2026년 12월 28일',

  phone: '010-2320-1543', // 대표 전화 개통 전까지 병원 휴대폰
  naverBooking: '', // 네이버예약 상품 링크 (비어 있으면 예약 버튼 대신 전화 버튼)
  kakao: '', // 카카오톡 채널 링크
  naverMap: '', // 네이버 지도 장소 링크
  blog: 'https://blog.naver.com/entwarriors',
  youtube: 'https://www.youtube.com/@%EA%B3%A0%EB%A0%A4%EC%9D%B4%EB%B9%84%EC%9D%B8%ED%9B%84%EA%B3%BC%EC%9D%98%EC%9B%90',
  naverPlace: '', // 네이버 플레이스 링크

  address: {
    full: '대전광역시 서구 구봉로 139 밀리온Ⅱ 3층', // 네이버 플레이스 주소와 글자까지 똑같이 맞출 것
    note: '기존 대전서울아산이비인후과가 있던 자리입니다.', // 오시는 길 안내 문장 (주소 칸에는 넣지 않음)
    street: '구봉로 139 밀리온Ⅱ 3층',
    locality: '대전광역시 서구',
    region: '대전광역시',
    postalCode: '', // 우편번호
    geo: null as { lat: number; lng: number } | null, // 좌표 확정 시 { lat: , lng: }
  },
  parking: '', // 예: '건물 주차장 2시간 무료'
  transit: '', // 예: '관저동 ○○ 정류장 하차 후 도보 3분'

  doctor: {
    name: '박성빈',
    title: '대표원장',
    specialty: '이비인후과 전문의',
    photo: '/images/doctor-coat-smile.webp',
    portrait: '/images/doctor-portrait.webp', // 원장 소개 페이지 대표 사진
    training: ['고려대학교 의과대학 의학사 · 대학원 의학석사', '고려대학교 안산병원 이비인후과 전공의 · 전임의'],
    // 홈 원장 소개에 배지로 보이는 대표 자격
    alumniOf: ['고려대학교 의과대학', '고려대학교 대학원'],
    memberOf: ['대한이비인후과학회', '대한수면연구학회', '대한평형의학회', '한국이명학회'],
    badges: ['보건복지부 이비인후과 전문의', '대한수면연구학회 수면 전문의', '대한이과학회 어지럼 전문가 과정 수료', '대한이과학회 난청-보청기 전문과정 수료', '대한이과학회 이명 전문과정 수료'],
    quote: '환자의 수면의 질, 삶의 질이 근본적으로 개선될 때까지 함께하는 의료를 추구합니다.',
    history: [
      { title: '학력', items: ['고려대학교 의과대학 의학사', '고려대학교 대학원 의학석사'] },
      { title: '수련', items: ['고려대학교 안산병원 이비인후과 레지던트 수료', '고려대학교 안산병원 이비인후과 전임의'] },
      {
        title: '자격',
        items: [
          '보건복지부 인증 이비인후과 전문의',
          '대한수면연구학회 수면 전문의',
          '대한이과학회 어지럼 전문가 과정 수료 (2023, KOS-Fellowship on Dizziness)',
          '대한이과학회 난청-보청기 전문과정 수료 (2025, KOS-HEC)',
          '대한이과학회 이명 전문과정 수료 (2025, KOS-TEC)',
        ],
      },
      { title: '학회 활동', items: ['대한이비인후과학회 정회원', '대한수면연구학회 정회원', '대한평형의학회 정회원', '한국이명학회 정회원'] },
    ],
  },
}

// 진료시간 — 화면 표와 구조화 데이터(openingHours)가 이 값을 함께 씁니다.
export type HoursRow = {
  days: string
  dayCodes: string[]
  open: string
  close: string
  breaks: string[]
  note?: string
}

export const hours: HoursRow[] = [
  {
    days: '월 · 수 · 금',
    dayCodes: ['Monday', 'Wednesday', 'Friday'],
    open: '08:30',
    close: '21:00',
    breaks: ['점심 12:30–14:00', '저녁 18:00–19:00'],
    note: '19시 이후 야간진료',
  },
  {
    days: '화 · 목',
    dayCodes: ['Tuesday', 'Thursday'],
    open: '08:30',
    close: '19:00',
    breaks: ['점심 12:30–14:00'],
  },
  {
    days: '토요일',
    dayCodes: ['Saturday'],
    open: '08:30',
    close: '14:00',
    breaks: [],
    note: '점심시간 없이 진료',
  },
  {
    days: '일요일 · 공휴일',
    dayCodes: ['Sunday', 'PublicHolidays'],
    open: '09:00',
    close: '13:00',
    breaks: [],
  },
]

export const hoursFootnote = '접수 마감 시간과 명절 단축진료는 공지사항으로 안내드립니다.'

// 원장 출연 영상 (출연 채널에서 사용 허락 받음). condition은 함께 보여줄 질환 페이지 slug.
export const videos = [
  {
    id: 'ky_IFGjxx4o',
    title: '자려고 마신 술 한잔, 수면무호흡증을 키우는 이유',
    channel: '건강의학전문채널 하이닥',
    condition: 'sleep-apnea',
  },
  {
    id: 'JoKzZ1YkWQQ',
    title: '빙글빙글 어지럼증 원인 이석증, 집에서 혼자 치료하면 위험한 이유',
    channel: '건강의학전문채널 하이닥',
    condition: 'bppv',
  },
]

// 언론 보도·자문 기사. 새 기사가 나오면 맨 위에 한 줄 추가하세요. (type: 'article' 기사 / 'video' 방송·영상 출연)
// 비어 있으면 홈의 '언론 보도' 칸은 자동으로 숨겨집니다.
export type Press = { title: string; outlet: string; date: string; url: string; type: 'article' | 'video' }
export const press: Press[] = [
  {
    title: '자려고 마신 술 한잔, 수면무호흡증을 키우는 이유',
    outlet: '하이닥',
    date: '2026',
    url: 'https://www.youtube.com/watch?v=ky_IFGjxx4o',
    type: 'video',
  },
  {
    title: '빙글빙글 어지럼증 원인 이석증, 집에서 혼자 치료하면 위험한 이유',
    outlet: '하이닥',
    date: '2026',
    url: 'https://www.youtube.com/watch?v=JoKzZ1YkWQQ',
    type: 'video',
  },
]

// 학회 교육과정 수료·인증. image에 수료패 사진 경로를 넣으면 사진과 함께 보입니다 (예: '/images/cert-dizziness.webp').
// 대한이과학회 전문 과정 수료패 (사진: public/images/certs/). center: 해당 센터 페이지에 함께 표시
export type Cert = { title: string; issuer: string; en: string; year: string; image: string; center: string; blurb: string }
export const certs: Cert[] = [
  {
    title: '어지럼 전문가 과정 수료',
    issuer: '대한이과학회',
    en: 'KOS-Fellowship on Dizziness',
    year: '2023',
    image: '/images/certs/dizziness.webp',
    center: 'dizziness',
    blurb: '대한이과학회 어지럼 전문가 과정을 수료한 이비인후과 전문의가 어지럼의 원인을 검사로 나누어 직접 진료합니다.',
  },
  {
    title: '난청-보청기 전문과정 수료',
    issuer: '대한이과학회',
    en: 'KOS-HEC (Hearing loss and hearing aid Expert Course)',
    year: '2025',
    image: '/images/certs/hearing-aid.webp',
    center: 'hearing',
    blurb: '대한이과학회 난청-보청기 전문과정을 수료한 이비인후과 전문의가 청력검사부터 보청기 처방·사후관리까지 직접 챙깁니다.',
  },
  {
    title: '이명 전문과정 수료',
    issuer: '대한이과학회',
    en: 'KOS-TEC (Tinnitus Expert Course)',
    year: '2025',
    image: '/images/certs/tinnitus.webp',
    center: 'hearing',
    blurb: '대한이과학회 이명 전문과정을 수료한 이비인후과 전문의가 이명의 원인과 불편 정도를 검사로 확인하고 관리합니다.',
  },
]

// 질환·센터 페이지에 보여줄 수료패 고르기
const certByCondition: Record<string, string> = {
  tinnitus: '이명 전문과정 수료',
  'hearing-aids': '난청-보청기 전문과정 수료',
  'hearing-aid-subsidy': '난청-보청기 전문과정 수료',
  presbycusis: '난청-보청기 전문과정 수료',
}
export function certsFor(center: string, condition?: string): Cert[] {
  if (condition && certByCondition[condition]) return certs.filter((c) => c.title === certByCondition[condition])
  if (condition && center === 'hearing') return []
  return certs.filter((c) => c.center === center)
}

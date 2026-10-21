// 병원 기본 정보 — 여기 값만 바꾸면 사이트 전체(화면·검색 메타·구조화 데이터)에 반영됩니다.
// 【확인】 표시는 개원 전에 실제 값으로 바꿔야 하는 항목입니다.

export const site = {
  name: '고려이비인후과',
  legalName: '고려이비인후과의원',
  nameEn: 'Korea ENT Clinic',
  url: 'https://djkoreaent.com',
  openDate: '2026-12-28',
  openDateLabel: '2026년 12월 28일',

  phone: '042-000-0000', // 【확인】 대표 전화
  naverBooking: 'https://booking.naver.com/', // 【확인】 네이버예약 상품 링크
  kakao: 'https://pf.kakao.com/', // 【확인】 카카오톡 채널 링크
  naverMap: 'https://map.naver.com/', // 【확인】 네이버 지도 장소 링크
  blog: 'https://blog.naver.com/entwarriors',
  youtube: 'https://www.youtube.com/@%EA%B3%A0%EB%A0%A4%EC%9D%B4%EB%B9%84%EC%9D%B8%ED%9B%84%EA%B3%BC%EC%9D%98%EC%9B%90',
  naverPlace: 'https://m.place.naver.com/', // 【확인】 네이버 플레이스 링크

  address: {
    full: '대전광역시 서구 관저동 【상세주소】 3층 304–307호',
    street: '【도로명 주소】 3층 304–307호',
    locality: '대전광역시 서구',
    region: '대전광역시',
    postalCode: '35000', // 【확인】
    geo: { lat: 36.2995, lng: 127.3375 }, // 【확인】 관저동 대략 좌표
  },
  parking: '건물 주차장 이용 가능 (【확인】 무료 시간)',
  transit: '관저동 【정류장명】 정류장 하차 후 도보 【 】분',

  doctor: {
    name: '박성빈',
    title: '대표원장',
    specialty: '이비인후과 전문의',
    photo: '/images/doctor-coat-smile.webp',
    portrait: '/images/doctor-portrait.webp', // 원장 소개 페이지 대표 사진
    training: ['고려대학교 의과대학 졸업', '고려대학교 안산병원 이비인후과 전임의'],
    quote: '환자의 수면의 질, 삶의 질이 근본적으로 개선될 때까지 함께하는 의료를 추구합니다.',
    history: [
      { title: '학력', items: ['고려대학교 의과대학 의학사', '고려대학교 대학원 의학석사'] },
      { title: '수련', items: ['고려대학교 안산병원 이비인후과 레지던트 수료', '고려대학교 안산병원 이비인후과 전임의'] },
      {
        title: '자격',
        items: [
          '보건복지부 인증 이비인후과 전문의',
          '대한수면연구학회 수면 전문의',
          '이비인후과 어지럼증 전문가 자격증',
          '이명 전문가 자격증',
          '보청기전문가 자격증',
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
    open: '08:30', // 【확인】 08:30 / 09:00
    close: '13:00',
    breaks: [],
  },
]

export const hoursFootnote = '접수 마감 시간과 명절 단축진료는 공지사항으로 안내드립니다.'

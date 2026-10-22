// 검색엔진·AI 검색이 읽는 구조화 데이터(schema.org JSON-LD)
import type { Center, Condition, Faq } from './content'
import { centers } from './content'
import { certs, hours, press, site } from './site'

const abs = (path: string) => new URL(path, site.url).toString()
export const clinicId = `${site.url}/#clinic`
export const doctorId = `${site.url}/#doctor`

export function clinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'Physician'],
    '@id': clinicId,
    name: site.legalName,
    alternateName: [site.name, site.nameEn],
    url: site.url,
    telephone: site.phone,
    image: abs(site.doctor.photo),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(site.address.postalCode && { postalCode: site.address.postalCode }),
      addressCountry: 'KR',
    },
    ...(site.address.geo && { geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng } }),
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayCodes.map((d) => `https://schema.org/${d}`),
      opens: h.open,
      closes: h.close,
    })),
    medicalSpecialty: 'https://schema.org/Otolaryngologic',
    availableService: centers.map((c) => ({ '@type': 'MedicalTherapy', name: c.name, url: abs(`/${c.slug}/`) })),
    employee: { '@id': doctorId },
    sameAs: [site.blog, site.youtube, site.naverPlace].filter(Boolean),
  }
}

export function doctorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': doctorId,
    name: site.doctor.name,
    jobTitle: `${site.doctor.title}, ${site.doctor.specialty}`,
    medicalSpecialty: 'https://schema.org/Otolaryngologic',
    image: abs(site.doctor.photo),
    worksFor: { '@id': clinicId },
    alumniOf: site.doctor.alumniOf.map((n) => ({ '@type': 'CollegeOrUniversity', name: n })),
    memberOf: site.doctor.memberOf.map((n) => ({ '@type': 'MedicalOrganization', name: n })),
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: '전문의 자격', name: '이비인후과 전문의', recognizedBy: { '@type': 'GovernmentOrganization', name: '보건복지부' } },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: '학회 인증', name: '수면 전문의', recognizedBy: { '@type': 'MedicalOrganization', name: '대한수면연구학회' } },
      ...certs.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: '교육과정 수료',
        name: c.title,
        ...(c.issuer && { recognizedBy: { '@type': 'MedicalOrganization', name: c.issuer } }),
      })),
    ],
    subjectOf: press.map((p) => ({
      '@type': p.type === 'video' ? 'VideoObject' : 'NewsArticle',
      name: p.title,
      url: p.url,
      publisher: { '@type': 'Organization', name: p.outlet },
    })),
    url: abs('/about/doctor/'),
  }
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: '홈', href: '/' }, ...items].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function conditionPageSchema(c: Condition, center: Center, reviewed: string) {
  const url = abs(`/${center.slug}/${c.slug}/`)
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': url,
    url,
    name: `${c.name} | ${site.name}`,
    description: c.summary,
    inLanguage: 'ko',
    lastReviewed: reviewed,
    reviewedBy: { '@id': doctorId },
    author: { '@id': doctorId },
    publisher: { '@id': clinicId },
    audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    about: {
      '@type': 'MedicalCondition',
      name: c.name,
      alternateName: c.alt,
      description: c.summary,
      ...(c.symptoms.length && {
        signOrSymptom: c.symptoms.map((s) => ({ '@type': 'MedicalSignOrSymptom', name: s })),
      }),
      ...(c.tests.length && { typicalTest: c.tests.map((t) => ({ '@type': 'MedicalTest', name: t })) }),
      possibleTreatment: c.treatment.map((t) => ({ '@type': 'MedicalTherapy', name: t.split(':')[0] })),
    },
  }
}

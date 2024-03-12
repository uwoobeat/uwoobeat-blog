const CONFIG = {
  // profile setting (required)
  profile: {
    name: "유우비트",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Backend Developer",
    bio: "글 쓰는 개발자 유우비트입니다.",
    email: "uwoobeat@gmail.com",
    linkedin: "uwoobeat",
    github: "uwoobeat",
    instagram: "uwoobeat",
  },
  projects: [
    {
      name: `10MM - 하루 10분으로 시작하는 습관 만들기`,
      href: "https://github.com/depromeet/10mm-server"
    },
    {
      name: 'GDSC Hongik 플랫폼',
      href: "https://github.com/GDSC-Hongik/gdsc-server"
    }
  ],
  // blog setting (required)
  blog: {
    title: "글 쓰는 코딩노예",
    description: "자주는 아니지만 잘 쓰려고 노력합니다."
  },

  // CONFIG configration (required)
  link: "https://uwoobeat.dev",
  since: 2023, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 60, // revalidate time for [slug], index
}

module.exports = { CONFIG }

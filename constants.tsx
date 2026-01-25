import { Event, Sermon, Language } from './types';

export const getUpcomingEvents = (lang: Language): Event[] => {
  const t = {
    pl: {
      1: { t: "Wieczór Uwielbienia", d: "Czas głębokiej modlitwy i muzyki, gdzie razem szukamy oblicza Boga." },
      2: { t: "Konferencja Męska 'Odwaga'", d: "Całodniowe wydarzenie dla mężczyzn, którzy chcą wzrastać w wierze." },
      3: { t: "Piknik Rodzinny", d: "Świetna zabawa dla całych rodzin. Grill, gry i zabawy dla dzieci." }
    },
    ua: {
      1: { t: "Вечір Поклоніння", d: "Час глибокої молитви та музики, де ми разом шукаємо обличчя Бога." },
      2: { t: "Чоловіча Конференція 'Відвага'", d: "Цілоденна подія для чоловіків, які хочуть зростати у вірі." },
      3: { t: "Сімейний Пікнік", d: "Чудова розвага для всієї родини. Гриль, ігри та забави для дітей." }
    },
    be: {
      1: { t: "Вечар Пакланення", d: "Час глыбокай малітвы і музыкі, дзе мы разам шукаем аблічча Бога." },
      2: { t: "Мужчынская Канферэнцыя 'Адвага'", d: "Цэладзённая падзея для мужчын, якія хочуць ўзрастаць у веры." },
      3: { t: "Сямейны Пікнік", d: "Выдатная забава для ўсёй сям'і. Грыль, гульні і забавы для дзяцей." }
    },
    ru: {
      1: { t: "Вечер Поклонения", d: "Время глубокой молитвы и музыки, где мы вместе ищем лица Бога." },
      2: { t: "Мужская Конференция 'Отвага'", d: "Событие на весь день для мужчин, желающих возрастать в вере." },
      3: { t: "Семейный Пикник", d: "Отличное время для всей семьи. Гриль, игры и развлечения для детей." }
    },
    en: {
      1: { t: "Worship Evening", d: "A time of deep prayer and music where we seek God's face together." },
      2: { t: "Men's Conference 'Courage'", d: "A full-day event for men who want to grow in faith." },
      3: { t: "Family Picnic", d: "Great fun for the whole family. Grill, games and activities for children." }
    }
  }[lang];

  return [
    {
      id: 1,
      title: t[1].t,
      date: "24.09.2023, 19:00",
      location: "Sala Główna",
      description: t[1].d,
      image: "https://picsum.photos/seed/worship/600/400"
    },
    {
      id: 2,
      title: t[2].t,
      date: "14.10.2023",
      location: "Dom Ojca",
      description: t[2].d,
      image: "https://picsum.photos/seed/men/600/400"
    },
    {
      id: 3,
      title: t[3].t,
      date: "28.05.2024, 14:00",
      location: "Park Zachodni",
      description: t[3].d,
      image: "https://picsum.photos/seed/picnic/600/400"
    }
  ];
};

export const getLatestSermons = (lang: Language): Sermon[] => {
  const titles = {
    pl: ["Fundamenty Wiary: Tożsamość", "Jak słyszeć głos Boga?", "Moc Przebaczenia"],
    ua: ["Фундаменти Віри: Ідентичність", "Як чути голос Бога?", "Сила Прощення"],
    be: ["Падмуркі Веры: Тоеснасць", "Як чуць голас Бога?", "Моц Прабачэння"],
    ru: ["Фундаменты Веры: Идентичность", "Как слышать голос Бога?", "Сила Прощения"],
    en: ["Foundations of Faith: Identity", "How to Hear God's Voice?", "The Power of Forgiveness"]
  }[lang];

  return [
    {
      id: 101,
      title: titles[0],
      speaker: "Pastor Główny",
      date: "17.09.2023",
      duration: "45 min",
      videoUrl: "#"
    },
    {
      id: 102,
      title: titles[1],
      speaker: "Pastor Pomocniczy",
      date: "10.09.2023",
      duration: "38 min",
      videoUrl: "#"
    },
    {
      id: 103,
      title: titles[2],
      speaker: "Guest Speaker",
      date: "03.09.2023",
      duration: "52 min",
      videoUrl: "#"
    }
  ];
};

export const getMinistries = (lang: Language) => {
  const t = {
    pl: {
      1: { t: "Dla Dzieci", d: "Bezpieczne miejsce dla najmłodszych." },
      2: { t: "Młodzież", d: "Energiczne spotkania dla nastolatków." },
      3: { t: "Grupy Domowe", d: "Budowanie relacji w mniejszych grupach." },
      4: { t: "Służba Ubogim", d: "Pomoc najbardziej potrzebującym." }
    },
    ua: {
      1: { t: "Для Дітей", d: "Безпечне місце для наймолодших." },
      2: { t: "Молодь", d: "Енергійні зустрічі для підлітків." },
      3: { t: "Домашні Групи", d: "Будування відносин у менших групах." },
      4: { t: "Служіння Бідним", d: "Допомога найбільш нужденним." }
    },
    be: {
      1: { t: "Для Дзяцей", d: "Бяспечнае месца для самых маленькіх." },
      2: { t: "Моладзь", d: "Энергічныя сустрэчы для падлеткаў." },
      3: { t: "Дамашнія Групы", d: "Будаванне адносін у меншых групах." },
      4: { t: "Служэнне Бедным", d: "Дапамога тым, хто ў патрэбе." }
    },
    ru: {
      1: { t: "Для Детей", d: "Безопасное место для самых маленьких." },
      2: { t: "Молодежь", d: "Энергичные встречи для подростков." },
      3: { t: "Домашние Группы", d: "Построение отношений в малых группах." },
      4: { t: "Служение Бедным", d: "Помощь самым нуждающимся." }
    },
    en: {
      1: { t: "For Children", d: "A safe place for the little ones." },
      2: { t: "Youth", d: "Energetic meetings for teenagers." },
      3: { t: "Home Groups", d: "Building relationships in smaller groups." },
      4: { t: "Serving the Poor", d: "Help for those most in need." }
    }
  }[lang];

  return [
    { title: t[1].t, desc: t[1].d, icon: "Heart" },
    { title: t[2].t, desc: t[2].d, icon: "Flame" },
    { title: t[3].t, desc: t[3].d, icon: "Users" },
    { title: t[4].t, desc: t[4].d, icon: "HandHeart" }
  ];
};
export type Announcement = {
  id: number;
  title: string;
  body: string;
  image: string;
  date: string;
};

export const KAZAKH_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Университетте жаңа IT зертханасы ашылды',
    body: 'Студенттер заманауи компьютерлермен, робототехника және жасанды интеллект құрылғыларымен жабдықталған жаңа зертханада тегін жұмыс істей алады. Зертхана аптаның жұмыс күндері сағат 09:00-ден 18:00-ге дейін ашық.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    date: '19 қазан, 2026'
  },
  {
    id: 2,
    title: 'Халықаралық академиялық ұтқырлық бағдарламасы басталады',
    body: 'Бакалавриат студенттері келесі семестрді Еуропаның жетекші университеттерінде грант негізінде оқып қайтуға өтініш бере алады. Құжаттарды қабылдау 1-қарашаға дейін халықаралық бөлімде жүргізіледі.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600',
    date: '18 қазан, 2026'
  },
  {
    id: 3,
    title: 'Студенттер арасындағы "Campus Hackathon 2026"',
    body: 'Алдағы демалыс күндері бағдарламалау бойынша дәстүрлі хакатон өтеді. Жеңімпаздарға бағалы сыйлықтар мен серіктес IT компаниялардан стажировка мүмкіндігі ұсынылады.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
    date: '15 қазан, 2026'
  },
  {
    id: 4,
    title: 'Кітапхана қоры жаңа оқулықтармен толықты',
    body: 'Пәнаралық бағыттағы 500-ден астам шетелдік және отандық әдебиеттер оқу залына жеткізілді. Электронды каталог арқылы кітаптарды алдын ала броньдауға болады.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600',
    date: '12 қазан, 2026'
  }
];

export async function fetchAnnouncements(): Promise<Announcement[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(KAZAKH_ANNOUNCEMENTS);
    }, 300);
  });
}

export async function fetchSingleAnnouncement(id: number): Promise<Announcement | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = KAZAKH_ANNOUNCEMENTS.find((a) => a.id === Number(id));
      resolve(item);
    }, 200);
  });
}
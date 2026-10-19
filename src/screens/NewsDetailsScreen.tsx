import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export type Announcement = {
  id: number;
  title: string;
  body: string;
  date: string;
};

const KAZAKH_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Университетте жаңа IT зертханасы ашылды',
    body: 'Студенттер заманауи компьютерлермен, робототехника және жасанды интеллект құрылғыларымен жабдықталған жаңа зертханада тегін жұмыс істей алады. Зертхана аптаның жұмыс күндері сағат 09:00-ден 18:00-ге дейін ашық.',
    date: '19 қазан, 2026'
  },
  {
    id: 2,
    title: 'Халықаралық академиялық ұтқырлық бағдарламасы басталады',
    body: 'Бакалавриат студенттері келесі семестрді Еуропаның жетекші университеттерінде грант негізінде оқып қайтуға өтініш бере алады. Құжаттарды қабылдау 1-қарашаға дейін халықаралық бөлімде жүргізіледі.',
    date: '18 қазан, 2026'
  },
  {
    id: 3,
    title: 'Студенттер арасындағы "Campus Hackathon 2026"',
    body: 'Алдағы демалыс күндері бағдарламалау бойынша дәстүрлі хакатон өтеді. Жеңімпаздарға бағалы сыйлықтар мен серіктес IT компаниялардан стажировка мүмкіндігі ұсынылады.',
    date: '15 қазан, 2026'
  },
  {
    id: 4,
    title: 'Кітапхана қоры жаңа оқулықтармен толықты',
    body: 'Пәнаралық бағыттағы 500-ден астам шетелдік және отандық әдебиеттер оқу залына жеткізілді. Электронды каталог арқылы кітаптарды алдын ала броньдауға болады.',
    date: '12 қазан, 2026'
  }
];

export async function fetchSingleAnnouncement(id: number): Promise<Announcement | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = KAZAKH_ANNOUNCEMENTS.find((a) => a.id === Number(id));
      resolve(item);
    }, 200);
  });
}

export default function NewsDetailsScreen({ route, navigation }: any) {
  const { announcementId } = route?.params || {};
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleAnnouncement(announcementId)
      .then((data) => {
        if (data) setAnnouncement(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [announcementId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B66E4" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.date}>{announcement?.date}</Text>
        <Text style={styles.title}>{announcement?.title}</Text>
        <Text style={styles.body}>{announcement?.body}</Text>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Артқа қайту</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F8FC' },
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  date: { fontSize: 13, color: '#0B66E4', fontWeight: '700', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#092B55', marginBottom: 14 },
  body: { fontSize: 16, color: '#334155', lineHeight: 24, marginBottom: 24 },
  backButton: { backgroundColor: '#60758A', padding: 16, borderRadius: 12, alignItems: 'center' },
  backText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 }
});
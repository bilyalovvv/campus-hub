import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';

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

export async function fetchAnnouncements(): Promise<Announcement[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(KAZAKH_ANNOUNCEMENTS);
    }, 300);
  });
}

export default function NewsScreen({ navigation }: any) {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const data = await fetchAnnouncements();
      setItems(data);
    } catch (e) {
      setError('Деректерді жүктеу мүмкін болмады');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0B66E4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10, fontSize: 16 }}>{error}</Text>
        <Button title="Қайталау" onPress={loadData} />
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Кампус Жаңалықтары</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.newsCard}
              onPress={() => navigation.navigate('NewsDetails', { announcementId: item.id })}
            >
              <View style={styles.newsContent}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.cardDesc}>{item.body}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F8FC' },
  container: { padding: 20, flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 16, color: '#092B55' },
  newsCard: { backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', padding: 16 },
  newsContent: { flex: 1 },
  newsDate: { fontSize: 12, fontWeight: '700', marginBottom: 6, color: '#0B66E4' },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#092B55' },
  cardDesc: { fontSize: 14, color: '#60758A', lineHeight: 20 }
});
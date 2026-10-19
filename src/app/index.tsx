import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

type ThemeType = 'light' | 'dark';
type FontScaleType = 'small' | 'normal' | 'large';

const SettingsContext = createContext<any>({
  theme: 'light',
  toggleTheme: () => {},
  fontScale: 'normal',
  setFontScale: () => {},
  colors: {}
});

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [fontScale, setFontScale] = useState<FontScaleType>('normal');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const colors = theme === 'light' 
    ? { background: '#F4F8FC', cardBg: '#FFFFFF', text: '#092B55', subText: '#60758A', primary: '#0B66E4' }
    : { background: '#121212', cardBg: '#1E1E1E', text: '#FFFFFF', subText: '#A0A0A0', primary: '#3B82F6' };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, fontScale, setFontScale, colors }}>
      {children}
    </SettingsContext.Provider>
  );
}

const useSettings = () => useContext(SettingsContext);

// --- ВСЕ 4 ҚАЗАҚША ЖАҢАЛЫҚ (Имитация API) ---
export type Announcement = {
  id: number;
  title: string;
  body: string;
  image: string;
  date: string;
};

const KAZAKH_ANNOUNCEMENTS: Announcement[] = [
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

async function fetchSingleAnnouncement(id: number): Promise<Announcement | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = KAZAKH_ANNOUNCEMENTS.find(a => a.id === Number(id));
      resolve(item);
    }, 200);
  });
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Details: {
    serviceId: string;
    title: string;
  };
  NewsDetails: {
    announcementId: number;
  };
  Settings: undefined;
};

export type MainTabParamList = {
  News: undefined;
  Home: undefined;
  Services: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function LoginScreen({ navigation }: any) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = () => {
    if (!login.trim() || password.length < 6) {
      setError('Логинді және кемінде 6 таңбалы құпиясөзді енгізіңіз');
      return;
    }
    setError('');
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Campus Hub</Text>
        <Text style={styles.hint}>Жүйеге кіру үшін деректерді енгізіңіз</Text>

        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
        />

        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Пароль"
            placeholderTextColor="#94A3B8"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(value => !value)}>
            <Text style={styles.showText}>{showPassword ? 'Жасыру' : 'Көрсету'}</Text>
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Кіру</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// --- ЖАҢАЛЫҚТАР ЭКРАНЫ (Барлық 4 жаңалық шығады) ---
function NewsScreen({ navigation }: any) {
  const { colors, fontScale }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

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
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[{ color: colors.text, marginBottom: 10, fontSize: 16 * mult }]}>{error}</Text>
        <Button title="Қайталау" onPress={loadData} />
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>Кампус Жаңалықтары</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Pressable 
              style={[styles.newsCard, { backgroundColor: colors.cardBg }]}
              onPress={() => navigation.navigate('NewsDetails', { announcementId: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={[styles.newsDate, { color: colors.primary }]}>{item.date}</Text>
                <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>{item.title}</Text>
                <Text numberOfLines={2} style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>{item.body}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function NewsDetailsScreen({ route, navigation }: any) {
  const { announcementId } = route.params || {};
  const { colors, fontScale }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleAnnouncement(announcementId)
      .then(data => {
        if (data) setAnnouncement(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [announcementId]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {announcement?.image && (
          <Image source={{ uri: announcement.image }} style={styles.detailImage} />
        )}
        <Text style={[styles.newsDate, { color: colors.primary, marginTop: 10 }]}>{announcement?.date}</Text>
        <Text style={[styles.title, { color: colors.text, fontSize: 24 * mult, marginTop: 4 }]}>{announcement?.title}</Text>
        <Text style={[styles.cardDesc, { color: colors.text, fontSize: 16 * mult, lineHeight: 24, marginTop: 15 }]}>
          {announcement?.body}
        </Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { fontSize: 16 * mult }]}>Артқа қайту</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }: any) {
  const { colors, fontScale }: any = useSettings();
  const titleSize = fontScale === 'small' ? 22 : fontScale === 'large' ? 30 : 26;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.welcome, { color: colors.primary }]}>Қош келдіңіз, студент!</Text>
        <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>Кампус сервистері</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>Толығырақ оқу үшін карточканы басыңыз</Text>

        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'lib-01', title: 'Кітапхана қызметі' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Кітапхана қоры және оқу залдары</Text>
          <Text style={[styles.cardDesc, { color: colors.subText }]}>Жұмыс уақыты: 09:00 - 20:00.</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ServicesScreen({ navigation }: any) {
  const { colors }: any = useSettings();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Қосымша сервистер</Text>
        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'trans-03', title: 'Кампус автобусы' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Кампус аралық автобус</Text>
          <Text style={[styles.cardDesc, { color: colors.subText }]}>№1 және №4 маршруттар әр 15 минут сайын жүреді.</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }: any) {
  const { colors }: any = useSettings();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Студент Профилі</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>Аты-жөні: Әлемжан Б.</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>Тобы: УС-ПИ-25-1к</Text>

        <Pressable style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
          <Text style={styles.buttonText}>Жүйеден шығу (Log Out)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { theme, toggleTheme, colors }: any = useSettings();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Қолданба баптаулары</Text>
        <View style={[styles.settingRow, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Қараңғы тақырып</Text>
          <Pressable style={[styles.smallBtn, { backgroundColor: colors.primary }]} onPress={toggleTheme}>
            <Text style={styles.buttonText}>{theme === 'light' ? 'Қосу' : 'Өшіру'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const { serviceId, title } = route.params || {};
  const { colors }: any = useSettings();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>{title || 'Толық ақпарат'}</Text>
        <Text style={[styles.cardDesc, { color: colors.text, fontSize: 16, marginBottom: 20 }]}>
          Сервис ID: {serviceId}
        </Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Артқа қайту</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="News" component={NewsScreen} options={{ title: 'Жаңалықтар' }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Басты бет' }} />
      <Tab.Screen name="Services" component={ServicesScreen} options={{ title: 'Сервистер' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Баптаулар' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Мәліметтер' }} />
          <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: 'Хабарландыру' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0B66E4' },
  loginCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 22 },
  loginTitle: { fontSize: 28, fontWeight: '800', color: '#092B55', marginBottom: 6, textAlign: 'center' },
  hint: { fontSize: 14, color: '#60758A', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#C7D7E8', padding: 14, borderRadius: 12, marginBottom: 14, fontSize: 16, color: '#000' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#C7D7E8', borderRadius: 12, marginBottom: 14 },
  passwordInput: { flex: 1, padding: 14, fontSize: 16, color: '#000' },
  showText: { color: '#0B66E4', fontWeight: '700', paddingHorizontal: 14 },
  error: { color: '#D9342B', marginBottom: 10, fontWeight: '600', textAlign: 'center' },
  loginButton: { backgroundColor: '#0B66E4', padding: 16, borderRadius: 12, marginTop: 6 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700', fontSize: 16 },
  
  safeArea: { flex: 1 },
  container: { padding: 20, flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 15, marginBottom: 20 },
  
  newsCard: { borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  newsImage: { width: '100%', height: 160 },
  newsContent: { padding: 14 },
  newsDate: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  
  detailImage: { width: '100%', height: 220, borderRadius: 16 },

  cardButton: { padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 14 },

  logoutButton: { backgroundColor: '#D9342B', padding: 16, borderRadius: 12, marginTop: 20 },
  backButton: { backgroundColor: '#60758A', padding: 16, borderRadius: 12, marginTop: 20, alignItems: 'center' },

  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  settingLabel: { fontSize: 16, fontWeight: '600' },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }
});
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useState } from 'react';
import {
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

const SettingsContext = createContext({
  theme: 'light' as ThemeType,
  toggleTheme: () => {},
  fontScale: 'normal' as FontScaleType,
  setFontScale: (scale: FontScaleType) => {},
});

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [fontScale, setFontScale] = useState<FontScaleType>('normal');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const colors = theme === 'light' 
    ? { background: '#F4F8FC', cardBg: '#FFFFFF', text: '#092B55', subText: '#60758A', primary: '#0B66E4' }
    : { background: '#121212', cardBg: '#1E1E1E', text: '#FFFFFF', subText: '#A0A0A0', primary: '#3B82F6' };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, fontScale, setFontScale, colors } as any}>
      {children}
    </SettingsContext.Provider>
  );
}

const useSettings = () => useContext(SettingsContext);

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Details: {
    serviceId: string;
    title: string;
  };
  Settings: undefined;
};

export type MainTabParamList = {
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

function HomeScreen({ navigation }: any) {
  const { colors, fontScale }: any = useSettings();
  
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.welcome, { color: colors.primary, fontSize: 16 * mult }]}>Қош келдіңіз, студент!</Text>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>Кампус сервистері мен жаңалықтар</Text>
        <Text style={[styles.subtitle, { color: colors.subText, fontSize: 15 * mult }]}>Толығырақ оқу үшін карточканы басыңыз</Text>

        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'lib-01', title: 'Кітапхана қызметі' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>Кітапхана қоры және оқу залдары</Text>
          <Text style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>Жұмыс уақыты: 09:00 - 20:00. Қолда 15 000-нан астам оқулықтар мен электронды базалар қолжетімді.</Text>
        </Pressable>

        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'sch-02', title: 'Академиялық кесте' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>Сабақтар кестесі мен аудиториялар</Text>
          <Text style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>Ағымдағы семестрдің дәріс және тәжірибелік сабақтарының кестесі жаңартылды.</Text>
        </Pressable>

        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'dorm-03', title: 'Жатқана хабарламасы' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>Студенттер үйі (Жатқана)</Text>
          <Text style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>Тіркелу шарттары, төлем ақы және коменданттык сағат ережелерімен танысыңыз.</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ServicesScreen({ navigation }: any) {
  const { colors, fontScale }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>Қосымша сервистер</Text>
        
        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'trans-03', title: 'Кампус автобусы' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>Кампус аралық автобус</Text>
          <Text style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>№1 және №4 маршруттар әр 15 минут сайын бас корпус пен жатқана арасында қатынаиды.</Text>
        </Pressable>

        <Pressable 
          style={[styles.cardButton, { backgroundColor: colors.cardBg }]}
          onPress={() => navigation.navigate('Details', { serviceId: 'med-04', title: 'Медициналық пункт' })}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18 * mult }]}>Студенттік емхана</Text>
          <Text style={[styles.cardDesc, { color: colors.subText, fontSize: 14 * mult }]}>№3 корпус, 102 кабинет. Алғашқы медициналық көмек және анықтамалар беру.</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }: any) {
  const { colors, fontScale }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>Студент Профилі</Text>
        <Text style={[styles.subtitle, { color: colors.subText, fontSize: 15 * mult }]}>Аты-жөні: Әлемжан Б.</Text>
        <Text style={[styles.subtitle, { color: colors.subText, fontSize: 15 * mult }]}>Тобы: УС-ПИ-25-1к</Text>
        <Text style={[styles.subtitle, { color: colors.subText, fontSize: 15 * mult }]}>Электронды пошта: alemzhan.b@university.edu</Text>

        <Pressable 
          style={styles.logoutButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={[styles.buttonText, { fontSize: 16 * mult }]}>Жүйеден шығу (Log Out)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { theme, toggleTheme, fontScale, setFontScale, colors }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>Қолданба баптаулары</Text>

        <View style={[styles.settingRow, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.settingLabel, { color: colors.text, fontSize: 16 * mult }]}>Қараңғы тақырып (Dark Theme)</Text>
          <Pressable style={[styles.smallBtn, { backgroundColor: colors.primary }]} onPress={toggleTheme}>
            <Text style={[styles.buttonText, { fontSize: 14 * mult }]}>{theme === 'light' ? 'Қосу' : 'Өшіру'}</Text>
          </Pressable>
        </View>

        <Text style={[styles.subtitle, { color: colors.text, marginTop: 20, fontSize: 15 * mult }]}>Қарпі өлшемі (Font Size):</Text>
        <View style={styles.fontRow}>
          {(['small', 'normal', 'large'] as FontScaleType[]).map(scale => (
            <Pressable
              key={scale}
              style={[
                styles.fontBtn,
                { backgroundColor: fontScale === scale ? colors.primary : colors.cardBg }
              ]}
              onPress={() => setFontScale(scale)}
            >
              <Text style={{ color: fontScale === scale ? '#FFF' : colors.text, fontWeight: '700', fontSize: 14 * mult }}>
                {scale === 'small' ? 'Кіші' : scale === 'normal' ? 'Орташа' : 'Үлкен'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const { serviceId, title } = route.params || {};
  const { colors, fontScale }: any = useSettings();
  const mult = fontScale === 'small' ? 0.85 : fontScale === 'large' ? 1.25 : 1.0;

  const getDetailedInfo = (id: string) => {
    switch (id) {
      case 'lib-01':
        return 'Кітапхана қоры соңғы үлгідегі оқулықтармен толықтырылған. Абонемент бөлімі мен электронды оқу залы апта сайын дүйсенбіден сенбіге дейін жұмыс істейді.';
      case 'sch-02':
        return 'Сабақ кестесі ағымдағы академиялық күнтізбеге сай құрылған. Дәрістер мен зертханалық жұмыстардың уақытын өз тобыңыздың парақшасынан көре аласыз.';
      case 'dorm-03':
        return 'Студенттер үйінде тұру ережелері мен төлем кестесі деканат тарапынан қадағаланады. Барлық сұрақтар бойынша комендантқа хабарласыңыз.';
      case 'trans-03':
        return 'Автобустар таңғы сағат 08:00-ден кешкі 19:00-ге дейін үздіксіз қатынаиды. Жолақы студенттік билет арқылы тегін немесе жеңілдетілген тарифпен жүзеге асады.';
      case 'med-04':
        return 'Медициналық пунктте қажетті алғашқы көмек көрсетіліп, флюорография және вакцинация туралы анықтамалар беріледі.';
      default:
        return 'Бұл сервис бойынша қосымша ақпарат жуырда жарияланады.';
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text, fontSize: 26 * mult }]}>{title || 'Толық ақпарат'}</Text>
        <Text style={[styles.subtitle, { color: colors.subText, fontSize: 15 * mult }]}>Сервис ID: {serviceId}</Text>
        <Text style={[styles.cardDesc, { color: colors.text, fontSize: 16 * mult, lineHeight: 22, marginBottom: 20 }]}>
          {getDetailedInfo(serviceId)}
        </Text>
        
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, { fontSize: 16 * mult }]}>Артқа қайту</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
  welcome: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 15, marginBottom: 20 },
  
  cardButton: { padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 14 },

  logoutButton: { backgroundColor: '#D9342B', padding: 16, borderRadius: 12, marginTop: 20 },
  backButton: { backgroundColor: '#60758A', padding: 16, borderRadius: 12, marginTop: 20 },

  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  settingLabel: { fontSize: 16, fontWeight: '600' },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  fontRow: { flexDirection: 'row', gap: 10 },
  fontBtn: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#C7D7E8' }
});
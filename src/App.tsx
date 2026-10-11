import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Details: {
    serviceId: string;
    title: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Қош келдіңіз!</Text>
        <Text style={styles.title}>Кампус сервистері</Text>
        <Text style={styles.subtitle}>Толығырақ көру үшін басыңыз</Text>

        <Pressable 
          style={styles.cardButton}
          onPress={() => navigation.navigate('Details', { serviceId: 'lib-01', title: 'Кітапхана' })}
        >
          <Text style={styles.cardTitle}>📖 Кітапхана</Text>
          <Text style={styles.cardDesc}>Оқу залдары мен электронды каталог</Text>
        </Pressable>

        <Pressable 
          style={styles.cardButton}
          onPress={() => navigation.navigate('Details', { serviceId: 'sch-02', title: 'Сабақ кестесі' })}
        >
          <Text style={styles.cardTitle}>📅 Сабақ кестесі</Text>
          <Text style={styles.cardDesc}>Аудиториялар мен оқытушылар</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}


function ServicesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Барлық сервистер</Text>
        <Pressable 
          style={styles.cardButton}
          onPress={() => navigation.navigate('Details', { serviceId: 'trans-03', title: 'Көлік және логистика' })}
        >
          <Text style={styles.cardTitle}>🚌 Кампус автобусы</Text>
          <Text style={styles.cardDesc}>Маршруттар мен кесте</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Студент Профилі</Text>
        <Text style={styles.subtitle}>Аты-жөні: Амина С.</Text>
        <Text style={styles.subtitle}>Тобы: CS-2026</Text>

        <Pressable 
          style={styles.logoutButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonText}>Жүйеден шығу (Log Out)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


function DetailsScreen({ route, navigation }: any) {
  const { serviceId, title } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title || 'Толық ақпарат'}</Text>
        <Text style={styles.subtitle}>Сервис ID: {serviceId}</Text>
        
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Басты бет' }} />
      <Tab.Screen name="Services" component={ServicesScreen} options={{ title: 'Сервистер' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Мәліметтер' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
  
  safeArea: { flex: 1, backgroundColor: '#F4F8FC' },
  container: { padding: 20, flex: 1 },
  welcome: { fontSize: 16, fontWeight: '600', color: '#0B66E4', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', color: '#092B55', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#60758A', marginBottom: 20 },
  
  cardButton: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#092B55', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#64748B' },

  logoutButton: { backgroundColor: '#D9342B', padding: 16, borderRadius: 12, marginTop: 20 },
  backButton: { backgroundColor: '#60758A', padding: 16, borderRadius: 12, marginTop: 20 },
});
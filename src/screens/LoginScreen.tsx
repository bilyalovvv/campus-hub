import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
});

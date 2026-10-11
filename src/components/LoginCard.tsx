import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type LoginCardProps = {
  onSuccess: (username: string) => void;
};

export function LoginCard({ onSuccess }: LoginCardProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      setError('Барлық өрісті толтырыңыз');
      return;
    }
    if (login.trim().length < 4) {
      setError('Логин кемінде 4 таңба болуы керек');
      return;
    }
    if (password.length < 6) {
      setError('Пароль кемінде 6 таңба болуы керек');
      return;
    }
    setError('');
    onSuccess(login.trim());
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Campus Hub</Text>
        <Text style={styles.hint}>Жүйеге кіру үшін деректерді енгізіңіз</Text>

        <TextInput
          style={[styles.input, !!error && styles.inputError]}
          placeholder="Логин"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          value={login}
          onChangeText={text => {
            setLogin(text);
            setError('');
          }}
        />

        <View style={[styles.passwordRow, !!error && styles.inputError]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Пароль"
            placeholderTextColor="#94A3B8"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setError('');
            }}
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
  inputError: { borderColor: '#D9342B' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#C7D7E8', borderRadius: 12, marginBottom: 14 },
  passwordInput: { flex: 1, padding: 14, fontSize: 16, color: '#000' },
  showText: { color: '#0B66E4', fontWeight: '700', paddingHorizontal: 14 },
  error: { color: '#D9342B', marginBottom: 10, fontWeight: '600', textAlign: 'center' },
  loginButton: { backgroundColor: '#0B66E4', padding: 16, borderRadius: 12, marginTop: 6 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700', fontSize: 16 },
});
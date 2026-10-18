import { Button, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export function SettingsScreen() {
  const { theme, fontScale, colors, setTheme, setFontScale, resetSettings } = useSettings();

  const fontSizes = {
    small: 14,
    normal: 17,
    large: 21,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text, fontSize: fontSizes[fontScale] + 4 }]}>
        Баптаулар (Settings)
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text, fontSize: fontSizes[fontScale] }]}>
          Қараңғы тақырып (Dark Theme)
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(enabled) => setTheme(enabled ? 'dark' : 'light')}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text, fontSize: fontSizes[fontScale] }]}>
          Қаріп өлшемі (Font Size)
        </Text>
        <View style={styles.buttonGroup}>
          <Button title="A-" onPress={() => setFontScale('small')} />
          <Button title="A" onPress={() => setFontScale('normal')} />
          <Button title="A+" onPress={() => setFontScale('large')} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Бастапқы күйге қайтару" color="#FF3B30" onPress={resetSettings} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontWeight: '600' },
  buttonGroup: { flexDirection: 'row', gap: 5 },
});

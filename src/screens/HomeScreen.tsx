import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export function HomeScreen({ navigation }: Props) {
  const { colors, fontScale } = useSettings();

  const fontSizes = {
    small: { title: 20, btn: 13 },
    normal: { title: 24, btn: 15 },
    large: { title: 30, btn: 18 },
  }[fontScale];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.title }]}>
        Басты бет (Home)
      </Text>

      <Pressable 
        style={[styles.button, { backgroundColor: colors.primary, marginBottom: 12 }]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[styles.btnText, { fontSize: fontSizes.btn }]}>⚙️ Баптауларға өту (Settings)</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, { backgroundColor: '#0B66E4' }]}
        onPress={() => navigation.navigate('Details', { serviceId: 'lib-01', title: 'Кітапхана' })}
      >
        <Text style={[styles.btnText, { fontSize: fontSizes.btn }]}>Кітапхана мәліметін ашу</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontWeight: '700', marginBottom: 20 },
  button: { padding: 14, borderRadius: 12, width: '80%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '600' }
});

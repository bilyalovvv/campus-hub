import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { MainTabParamList, RootStackParamList } from '../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ProfileScreen({ navigation }: Props) {
  const { colors, fontScale } = useSettings();

  const fontSizes = {
    small: { title: 20, btn: 13 },
    normal: { title: 24, btn: 15 },
    large: { title: 30, btn: 18 },
  }[fontScale];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.title }]}>
        Студент Профилі
      </Text>
      <Pressable 
        style={[styles.settingsButton, { backgroundColor: colors.primary }]} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[styles.btnText, { fontSize: fontSizes.btn }]}>Баптаулар (Settings)</Text>
      </Pressable>

      <Pressable 
        style={styles.logoutButton} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={[styles.btnText, { fontSize: fontSizes.btn }]}>Жүйеден шығу (Log Out)</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  title: { fontWeight: '700', marginBottom: 10 },
  settingsButton: { padding: 14, borderRadius: 12, width: '80%', alignItems: 'center' },
  logoutButton: { backgroundColor: '#D9342B', padding: 14, borderRadius: 12, width: '80%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '600' }
});
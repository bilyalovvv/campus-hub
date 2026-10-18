import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ route, navigation }: Props) {
  const { serviceId, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>Сервис ID: {serviceId}</Text>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Артқа қайту</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F8FC' },
  title: { fontSize: 26, fontWeight: '800', color: '#092B55', marginBottom: 10 },
  text: { fontSize: 16, color: '#52677D', marginBottom: 20 },
  button: { backgroundColor: '#60758A', padding: 12, borderRadius: 10 },
  btnText: { color: '#FFF', fontWeight: '600' }
});
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { SectionTitle, ServiceCard } from '../components';
import { services } from '../data/services';
import { spacing } from '../styles/theme';
import { Service } from '../types/Service';

export function ServicesScreen({ navigation }: any) {
  const openService = (service: Service) => {
    navigation.navigate('Details', {
      serviceId: service.id,
      title: service.title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle title="Кампус сервистері" subtitle="Барлық қолжетімді қызметтер" />
      <FlatList 
        data={services} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={openService} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FC', padding: spacing.md },
});

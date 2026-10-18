import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../styles/theme';
import { Service } from '../types/Service';

type Props = {
  service: Service;
  onPress: (service: Service) => void;
  width?: number;
};

export function ServiceCard({ service, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(service)} style={styles.card}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
  description: { fontSize: 14, color: colors.muted },
});


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Service } from '../types/Service';

type CardProps = {
  service: Service;
  width: number;
};

export function ServiceCard({ service, width }: CardProps) {
  return (
    <View style={[styles.card, { width, backgroundColor: service.color }]}>
      <Text style={styles.icon}>{service.icon}</Text>
      <Text style={styles.cardTitle}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 170,
    padding: 16,
    borderRadius: 18,
    justifyContent: 'space-between',
    shadowColor: '#092B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: { fontSize: 30 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#092B55' },
  description: { fontSize: 14, lineHeight: 20, color: '#52677D' },
});


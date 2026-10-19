import { Pressable, StyleSheet, Text } from 'react-native';
import { Announcement } from '../types/announcement';

type Props = { 
  item: Announcement;
  onPress: () => void;
};

export function AnnouncementCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 }
});

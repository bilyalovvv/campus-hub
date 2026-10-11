import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

function ServicesPlaceholder() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Сервистер беті</Text>
    </View>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen as any} options={{ title: 'Басты бет' }} />
      <Tab.Screen name="Services" component={ServicesPlaceholder} options={{ title: 'Сервистер' }} />
      <Tab.Screen name="Profile" component={ProfileScreen as any} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}

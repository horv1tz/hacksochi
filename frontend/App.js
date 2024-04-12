import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Camera from './screens/Camera';
import UploadImages from './screens/UploadImages';
const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Контроль цен" component={Home} />
    <Stack.Screen name="Камера" component={Camera} />
    <Stack.Screen name="Загрузить изображение" component={UploadImages} />
  </Stack.Navigator>
</NavigationContainer>
  );
}


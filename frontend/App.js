import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import CameraScreen from './screens/Camera';
import UploadImages from './screens/UploadImages';
import Admin from "./screens/Admin";
import Register from "./screens/Register";
import SelectStore from "./screens/SelectStore";
import Sended from "./screens/Sended";
const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Регистрация" component={Register} />
    <Stack.Screen name="Выбор магазина" component={SelectStore} />
    <Stack.Screen name="Контроль цен" component={Home} />
    <Stack.Screen name="Камера" component={CameraScreen} />
    <Stack.Screen name="Загрузить изображение" component={UploadImages} />
    <Stack.Screen name="Статус" component={Sended} />
    <Stack.Screen name="Админ-панель" component={Admin} />
  </Stack.Navigator>
</NavigationContainer>
  );
}


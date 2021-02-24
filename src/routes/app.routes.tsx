import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashboard from '../screens/Dashboard';
import Cart from '../screens/Cart';
import Detail from '../screens/Detail';
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: 'CartSoLivros',
        headerTintColor: '#3253ad',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: 'CartSoLivros',
        headerTintColor: '#3253ad',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <Icon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerTitle: 'CartSoLivros',
        headerTintColor: '#3253ad',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },

        headerBackImage: () => <Icon name="chevron-left" size={24} />,
      }}
      name="Detail"
      component={Detail}
    />
  </App.Navigator>
);

export default AppRoutes;
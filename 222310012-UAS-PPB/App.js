import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Components/HomeScreen';
import { StyleSheet } from 'react-native';
import ProfileScreen from './Components/ProfileScreen';
import LoginScreen from './Components/LoginScreen';
import SignUpScreen from './Components/SignUpScreen';
import SheetScreen from './Components/SheetScreen';
import SheetDetailScreen from './Components/SheetDetailScreen';
import { UserProvider } from './Components/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'document' : 'document-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'darkgray',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: ({ focused }) => [
          styles.tabBarItem,
          focused ? styles.tabBarItemSelected : styles.tabBarItemUnselected,
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="SheetScreen" component={SheetScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SheetDetailScreen" component={SheetDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'lightgray',
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabBarItemSelected: {
    backgroundColor: 'darkgray',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'lightgray',
  },
  tabBarItemUnselected: {
    backgroundColor: 'lightgray',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
  },
});

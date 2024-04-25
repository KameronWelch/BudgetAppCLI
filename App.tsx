import { View, ActivityIndicator } from 'react-native'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseConfig'
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Splash from './screens/Splash'

import Accounts from './screens/Accounts'
import Budgets from './screens/Budgets'
import Dashboard from './screens/Dashboard'
import Reports from './screens/Reports'
import Settings from './screens/Settings'
import ResetPassword from './screens/ResetPassword'
import Profile from './screens/Profile'
import MyAccount from './screens/MyAccount'
import SuccessScreen from './screens/SuccessScreen';
import NewBudget from './screens/NewBudget';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticatedUserContext = createContext();

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
//Settings Screen Stack
function SettingsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0047AB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
//Reports Screen Stack
function ReportsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Reports"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0047AB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen name="Reports" component={Reports} />
    </Stack.Navigator>
  );
}
//Dashboard Screen Stack
function DashboardStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0047AB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

//Budgets Screen Stack
function BudgetsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Budgets"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0047AB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen name="Budgets" component={Budgets} />
      <Stack.Screen name="NewBudget" component={NewBudget} />
    </Stack.Navigator>
  );
}

//Accounts Screen Stack
function AccountsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Accounts"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0047AB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
//Screens for after the user has logged in
function InsideStack() {
  return (
    <Tab.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Accounts"
        component={AccountsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="wallet-outline" size={size} color={color} />
            <Icon name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="receipt-outline" size={size} color={color} />
            <Icon name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="home-outline" size={size} color={color} />
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="analytics-outline" size={size} color={color} />
            <Icon name="analytics-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="settings-outline" size={size} color={color} />
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

//Screens for before the user has logged in

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  //If the user signs out it will brink them back to the AuthStack
  return (
    <NavigationContainer>
      {user ? <InsideStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    </SafeAreaProvider>

  );
}
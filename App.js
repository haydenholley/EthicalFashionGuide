import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite/legacy';
import CompanyDirectory from './src/CompanyDirectory/CompanyDirectory';
import BarcodeScanner from './src/BarcodeScanner/BarcodeScanner';
import About from './src/About/About';
import { View, Text, Image, StyleSheet } from 'react-native';


const Tab = createBottomTabNavigator();

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('./src/assets/images/BWA_logo.jpg')} style={styles.headerImage} resizeMode="contain" />
      <Text style={styles.headerText}>ETHICAL FASHION GUIDE</Text>
    </View>
  );
}

function MyTabs({ db }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',

        },
        tabBarShowLabel: false,
        headerTitle: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: '#fff046', //yellow
        }
      })}
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          // Prevent default behavior
          e.preventDefault();

          navigation.navigate(route.name);
        },
      })}>
      <Tab.Screen
        name="Company Directory"
        children={() => <CompanyDirectory db={db} />} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./src/assets/images/list.png')}
              style={[styles.tabIcon, focused ? styles.tabIconFocused: null]}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Barcode Scanner" 
        component={BarcodeScanner} 
        options={{ 
          tabBarIcon: ( {focused }) => (
            <Image
              source={require('./src/assets/images/barcode.png')}
              style={[styles.tabIcon, focused ? styles.tabIconFocused: null]}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="About" 
        component={About} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./src/assets/images/question.png')}
              style={[styles.tabIcon, focused ? styles.tabIconFocused: null]}
            />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const openDatabase = () => {
      console.log('Attempting to open the database...');
      const dbInstance = SQLite.openDatabase('Company_database.db');
      setDb(dbInstance);
      console.log('Database opened successfully');
    };
  
    openDatabase();

  }, []);

  if (!db) {
    console.log('Database is not ready yet.');
    return null; // or a loading indicator while the database is being opened
  }

  return (
    <NavigationContainer>
      <MyTabs db={db}/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 22, // Set width proportional to the font size
    height: 22, // Set height proportional to the font size
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#333f4c',
  },
  tabIcon: {
    width: 30,
    height: 30,
    tintColor: '#686868',
  },
  tabIconFocused: {
    tintColor: 'black',
  },
});

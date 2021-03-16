import React from 'react';

import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/Home'
import ForumRoute from './src/ForumScreen/ForumRoute'
import ListRoute from './src/NewsScreen/NewsRoute'


const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, }}>
        <NavigationContainer barStyle={{}}>
          <Tab.Navigator
            initialRouteName="Home"    
            barStyle={{ backgroundColor: '#4f647d' }}
          >
            <Tab.Screen
              name="Home"
              headerTitle="Home"
              component={Home}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Forum"
              component={ForumRoute}
              options={{
                tabBarLabel: 'Forum',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="forum-outline" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="List"
              component={ListRoute}
              options={{
                tabBarLabel: 'News',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

});

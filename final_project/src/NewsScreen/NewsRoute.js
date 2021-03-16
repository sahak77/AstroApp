import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewsListItem } from './NewsListItem';
import { NewsList } from './NewsList';

const NewsStack = createStackNavigator();

function NewsRoute() {
  return (
    <NewsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <NewsStack.Screen name="NewsList" component={NewsList} />
      <NewsStack.Screen name="NewsListItem" component={NewsListItem} />
    </NewsStack.Navigator>
  );
}

export default NewsRoute;
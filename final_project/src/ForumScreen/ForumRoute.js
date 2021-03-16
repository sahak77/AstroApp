import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForumList } from './ForumList';
import { ForumListItem } from './ForumListItem';
import { AddQuestion } from './AddQuestion'

const NewsStack = createStackNavigator();

function ForumRoute() {
  return (
    <NewsStack.Navigator
        screenOptions={{
            headerShown: false,
        }}>      
      <NewsStack.Screen name="ForumList" component={ForumList} />
      <NewsStack.Screen name="ForumListItem" component={ForumListItem} />
      <NewsStack.Screen name="AddQuestion" component={AddQuestion} />
    </NewsStack.Navigator>
  );
}

export default ForumRoute;
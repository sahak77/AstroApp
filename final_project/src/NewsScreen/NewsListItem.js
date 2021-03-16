import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native"
import Head from '../Head'

export const NewsListItem = (props) => {
  return (
    <ScrollView style={{ width: "100%", backgroundColor: "#393e46" }}>
      <SafeAreaView style={{ alignItems: 'center' }}>
        <Head title="NEWS" bacColor="#393e46" />
        <TouchableOpacity style={{ position: "absolute", left: 7, top: 10 }} title="go back" onPress={() => props.navigation.navigate('NewsList')}><Image style={{ width: 40, height: 40 }} source={require("../../assets/img/arrow-left.png")} /></TouchableOpacity>
        <View style={{ backgroundColor: '#393e46', padding: 10, }}>
          <View style={{ marginBottom: 5, }}><Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>{props.route.params.obj.title}</Text></View>
          <Image style={{ marginBottom: 5, width: Dimensions.get('window').width-20, height: 200 }} source={{ uri: props.route.params.obj.imgUrl }} />
          <View><Text style={{ fontSize: 15, color: "white" }}>{props.route.params.obj.content}</Text></View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})
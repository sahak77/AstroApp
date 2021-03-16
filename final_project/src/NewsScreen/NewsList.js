import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView,Image, ActivityIndicator, FlatList } from "react-native"
import Head from '../Head'

export const NewsList = (props) => {
  const [data, setData] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(
    () => {
      fetchData()
    }, []
  )
  const fetchData = async () => {
    const res = await fetch('https://finalproject-26ad5.firebaseio.com/news.json')
    const fetchedData = await res.json()

    if (fetchedData) {
      const apartaments = Object.keys(fetchedData).map(key => {
        return {
          id: key,
          ...fetchedData[key]
        }
      })
      setData(apartaments)
      isLoading(false)
    }
  }
  
  let lastdata = [...data].reverse();

  return (
    <SafeAreaView style={styles.container}>
      <Head title="ALL NEWS" bacColor="#252a34" />
      {loading
        ? <View style={{ marginTop: 30, }}>
          <ActivityIndicator size="large" color="black" style={{ marginTop: 5, marginBottom: 15, }} />
        </View>
        : <FlatList style={{width: "100%"}}
          data={lastdata}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.list} key={item.id} onPress={() => props.navigation.navigate('NewsListItem', { obj: item })}>
                  <Image style={styles.post_img} source={{ uri: item.imgUrl }} />
                  <View style={styles.text_box}>
                    <View style={styles.newsid}><Text style={styles.news_text}>{item.title}</Text></View>
                    <Text style={styles.news_text_desc}>{item.content.substr(0, 120)}...</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#f5f5f5",
  },
  post_img: {
    resizeMode: "cover",
    width: "100%",
    height: 250,
    marginBottom: 0,
    marginTop: 0,
  },
  list_img: {
    width: "0%", height: 0,
    position: "absolute",
    top: 48,
  },
  list: {
    width: "95%",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  newsid: {
    marginBottom: 5,
    width: "100%",
    height: "auto",
    paddingVertical: 5,
  },
  text_box: {
    width: "100%",
    backgroundColor: "white",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  news_text: {
    fontSize: 20,
    color: "#525151",
    fontWeight: "bold",
  },
  news_text_desc: {
    fontSize: 15,
    color: "#acacac",
  }
});
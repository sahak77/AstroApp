import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from "react-native"
import Head from '../Head'
import { ScrollView } from 'react-native-gesture-handler'

export const ForumList = (props) => {
  const [data, setData] = useState([])
  const [arr, setArr] = useState([]);
  const [val, changeval] = useState("")
  const [isLoading, loading] = useState(true)

  useEffect(
    () => {
      fetchData()
    }, []
  )
  const fetchData = async () => {
    const res = await fetch('https://finalproject-26ad5.firebaseio.com/question.json')
    const fetchedData = await res.json()
    if (fetchedData) {
      const apartaments = Object.keys(fetchedData).map(key => {
        return {
          id: key,
          ...fetchedData[key]
        }
      })
      setData(apartaments)
      setArr(apartaments)
      loading(false)
    }
  }
  const addQuest = () => {
    props.navigation.navigate('AddQuestion')
    fetchData()
  }
  const singleQuest = (item) =>{
    changeval("")
    setData(arr)
    fetchData()
    props.navigation.navigate('ForumListItem', { obj: item },)
  }
  let datareverse = [...data].reverse();


  const searchFilterFunction = text => {
    changeval(text); 
    const newData = arr.filter(item => {
      const itemData = `${item.nickname.toUpperCase()} ${item.question.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };

  if (window.value == true) {
    fetchData()
    window.value = false
  }


  return (
    <SafeAreaView style={styles.container}>
      <Head _="#" title="Forum" bacColor="#000" />
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.quest_head}>
          <View style={styles.search_image}>
            <Image style={{ width: 25, height: 25, }} source={require("../../assets/img/search.png")} />
          </View>
          <TextInput style={styles.search_input} placeholder="Search..." placeholderTextColor="rgb(199, 195, 195)" value={val}
            onChangeText={text => searchFilterFunction(text)} />
          <TouchableOpacity style={styles.go_quest_page} onPress={addQuest}><Image style={{ width: 35, height: 35 }} source={require("../../assets/img/cross.png")} /></TouchableOpacity>
        </View>

        {isLoading
          ? <View>
            <ActivityIndicator size="large" color="white" style={{ marginTop: 15, marginBottom: 15, }} />
          </View>
          :
          <FlatList style={{ paddingTop: 50 }}
            data={datareverse}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              if (index % 2 == 0) {
                return (
                  isLoading ? <View>
                    <ActivityIndicator size="large" color="white" style={{ marginTop: 15, marginBottom: 15, }} />
                  </View>
                    : <View style={styles.box}>
                      <View style={{ width: 40, position: "relative", marginRight: 7 }}>
                        <Image style={{ width: 40, height: 45, position: "absolute", top: -20 }} source={require("../../assets/img/robot1.png")} />
                      </View>
                      <TouchableOpacity key={item.id} style={[styles.box_onPress, { flexDirection: "row", marginRight: 11, }]} onPress={()=>singleQuest(item)}>
                        <View style={{ height: "100%", width: 7, backgroundColor: "#00f100" }}>
                        </View>
                        <View style={{ width: "93%", paddingLeft: 25, }}>
                          <Text nickname={`${item.nickname}`} style={{ color: "#ff5f00", fontSize: 17, fontWeight: "bold" }}><Text style={{ color: "#c7c3c3" }}># </Text>{item.nickname}</Text>
                          <Text question={`${item.question}`} style={{ fontWeight: "bold", width: "75%", fontSize: 13, marginRight: 3, marginTop: 5, color: "#9b9ead" }}>{item.question}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                )
              }
              if (index % 2 != 0) {
                return (
                  isLoading ? <View>
                    <ActivityIndicator size="large" color="white" style={{ marginTop: 15, marginBottom: 15, }} />
                  </View>
                    : <View style={styles.box}>
                      <TouchableOpacity key={item.id} style={[styles.box_onPress, { flexDirection: "row-reverse" }]} onPress={() => props.navigation.navigate('ForumListItem', { obj: item }, changeval(""), setData(arr))}>
                        <View style={{ height: "100%", width: 7, backgroundColor: "#ff5f00" }}>
                        </View>
                        <View style={{ width: "93%", padding: 5, }}>
                          <Text nickname={`${item.nickname}`} style={{ color: "#00f100", fontSize: 17, fontWeight: "bold" }}><Text style={{ color: "#c7c3c3" }}># </Text>{item.nickname}</Text>
                          <Text question={`${item.question}`} style={{ marginTop: 5, width: "75%", fontWeight: "bold", fontSize: 13, marginRight: 3, color: "#989ba9" }}>{item.question} </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ width: 40, position: "relative", marginRight: 11, marginLeft: 7 }}>

                        <Image style={{ width: 40, height: 45, position: "absolute", top: -20 }} source={require("../../assets/img/robot2.png")} />
                      </View>
                    </View>
                )
              }

            }}
          />
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333333",
  },
  box: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  box_onPress: {
    paddingVertical: 15,
    width: "80%",
    backgroundColor: "#1d1d1d",
    borderRadius: 10,
  },
  quest_head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  quest_head_text: {
    flexDirection: "row",
    width: "75%",
    paddingVertical: 10,
    backgroundColor: "#4c4c4c",
    borderWidth: 1,
    borderColor: "#858585",
    borderRadius: 7,
  },
  go_quest_page: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  search_image: {
    padding: 7,
    paddingHorizontal: 5,
    backgroundColor: "#015792",
    alignItems: "center",
    paddingVertical: 7,
    justifyContent: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  search_input: {
    color: "rgb(199, 195, 195)",
    padding: 10,
    width: "70%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#015792",
    borderBottomEndRadius: 4,
    borderTopRightRadius: 4
  },
})
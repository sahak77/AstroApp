import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Dimensions } from "react-native"
import Head from '../Head'

export const ForumListItem = (props) => {
  const [Comm, commVla] = useState('')
  const [comment, setComment] = useState([])
  const [emptyUrl, emptyUrlVal] = useState(false)

  useEffect(
    () => {
      fetchData()
    }, []
  )
  const fetchData = async () => {
    if (props.route.params.obj.img == undefined || props.route.params.obj.img == "") {
      emptyUrlVal(true)
    }
    const res = await fetch(`https://finalproject-26ad5.firebaseio.com/question/${props.route.params.obj.id}/comment.json`)
    const fetchedData = await res.json()
    if (fetchedData) {
      const apartaments = Object.keys(fetchedData).map(key => {
        return {
          id: key,
          ...fetchedData[key]
        }
      }) 
      setComment(apartaments)
    }
  }
  const addComm = async (id) => {
    const res = await fetch(`https://finalproject-26ad5.firebaseio.com/question/${id}/comment.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        com: Comm,
      }),
    })
    const Comment = await res.json()
    console.log(Comment);
    fetchData()
    commVla("")
  }
  let commentreverse = [...comment].reverse();

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <Head _="#" title="Forum" bacColor="#000" />
        <TouchableOpacity style={{ position: "absolute", left: 7, top: 10 }} title="go back" onPress={() => props.navigation.navigate('ForumList')}><Image style={{ width: 40, height: 40 }} source={require("../../assets/img/arrow-left.png")} /></TouchableOpacity>
        <View style={{width: "100%", padding: 10, }}>

          <View style={{ marginBottom: 15, }}><Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>{props.route.params.obj.question}</Text></View>
          <View style={{ marginBottom:10}}>
            <Text style={styles.nick_date}># posted by {props.route.params.obj.nickname} / date: {props.route.params.obj.time} </Text>
          </View>

          {
          emptyUrl?<View></View>
          :<Image style={{ marginBottom: 5, width: Dimensions.get('window').width-18, height: 200 }} source={props.route.params.obj.img ? {uri: props.route.params.obj.img } : null } />//props.route.params.obj.img ? {uri: props.route.params.obj.img } : null 
          }
          <View><Text style={{ fontSize: 15, color: "#b6b6b8" }}>{props.route.params.obj.content}</Text></View>
        </View>
        <View style={{ flexDirection: "row", width: "90%", margin: 10, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
          <TextInput value={Comm} placeholder={"enter question"} onChangeText={commVla} style={styles.input} />
          <TouchableOpacity style={styles.add} onPress={() => addComm(props.route.params.obj.id)}><Text style={{ color: "white" }}>add</Text></TouchableOpacity>
        </View>
        {
          commentreverse.map((j, index) => {
            if (index%2 == 0) {
              return (
                <View key={j.id} style={[styles.commentBox, {backgroundColor:"#1f354d", borderColor: "#4395ec" }]}>
                    <Image style={styles.robot_img} source={require("../../assets/img/robot_com.png")} />
                    <View style={{flexDirection: "row",alignItems:"center", justifyContent: "flex-start",  width:"80%"}}><Text style={{ width: "95%",color: "white", padding: 10, }}>{j.com}</Text></View>
                </View>
              )
            }
            if (index%2!=0) {
              return (
                <View key={j.id} style={[styles.commentBox, {backgroundColor:"#45351c", borderColor: "#c1a57b",}]}>
                    <View style={{justifyContent: "center",alignItems:"flex-start", width:"80%" }}><Text style={{ width: "95%",color: "white", padding: 10, paddingLeft: 12, }}>{j.com}</Text></View>
                    <Image style={styles.robot_img} source={require("../../assets/img/robot_com.png")} />
                </View>
              )
            }
          })
        }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    paddingBottom: 20,
  },
  input: {
    width: "85%",
    paddingLeft: 5,
    height: 40,
    borderColor: 'gray',
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
  add: {
    width: "15%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(68,149,236)",
  },
  nick_date: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#7894b5"
  },
  robot_img: {
    width: 50,
    height: 60,
    marginRight: 5,
    margin: 10,
  },
  commentBox: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10
  }
})
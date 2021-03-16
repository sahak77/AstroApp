import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import Head from '../Head'

window.value = false;

export const AddQuestion = (props) => {
  const [val, setval] = useState('')
  const [nickname, nicknameVal] = useState('')
  const [content, contentVal] = useState('')
  const [img, imgVal] = useState('')

  const [error, errorval] = useState(false)

  const addData = async () => {



    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getHours() + ":" + today.getMinutes();
    var utc = date;
    if (nickname == "" || val == "") {
      errorval(true)
    }
    else {
      errorval(false)
      const res = await fetch('https://finalproject-26ad5.firebaseio.com/question.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: utc,
          question: val,
          nickname: nickname,
          content: content,
          img: img,
        }),
      })
      const data = await res.json()
      console.log(data)
      window.value = true
      await props.navigation.navigate('ForumList', { reload: "wait" })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Head _="#" title="add question" bacColor="#000" />
      <TouchableOpacity style={{ position: "absolute", left: 7, top: 10 }} title="go back" onPress={() => props.navigation.navigate('ForumList')}><Image style={{ width: 40, height: 40 }} source={require("../../assets/img/arrow-left.png")} /></TouchableOpacity>

      <View style={styles.input_view}>
        {
          error
            ? <View style={{ width: "85%" }}><View style={{ width: "100%", backgroundColor: "#ff7269", padding: 10, marginBottom: 20, borderRadius: 10, borderWidth: 1, borderColor: "red" }}><Text>error :(  fill in all required fields</Text></View></View>
            : <View></View>
        }
        <TextInput placeholder={"nickname (required)"} placeholderTextColor={"rgb(237, 176, 71)"} onChangeText={nicknameVal}
          style={styles.input} />
        <TextInput placeholder={"enter question (required)"} placeholderTextColor={"rgb(237, 176, 71)"}
          onChangeText={setval}
          style={styles.input} />
        <TextInput placeholder={"img"} placeholderTextColor={"rgb(237, 176, 71)"} onChangeText={imgVal}
          style={styles.input} />
        <TextInput onChangeText={contentVal}
          style={styles.textarea}
          underlineColorAndroid="transparent"
          placeholder={"Type Description"}
          placeholderTextColor={"rgb(237, 176, 71)"}
          numberOfLines={10}
          multiline={true}
        />
        <TouchableOpacity style={styles.addQuest} onPress={addData}><Image source={require("../../assets/img/communications.png")} style={{ width: 30, height: 30, marginRight: 10 }} /><Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>add question</Text></TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    width: "85%",
    marginBottom: 25,
    paddingLeft: 3,
    backgroundColor: "#4c4c4c",
    borderWidth: 1,
    borderColor: "#acacac",
    borderRadius: 10,
    color: "white",
    paddingLeft: 5,
  },
  textarea: {
    width: "85%",
    borderWidth: 1,
    borderColor: '#9E9E9E',
    backgroundColor: "#4c4c4c",
    height: 150,
    color: "white",
    borderRadius: 10,
    marginBottom: 25,
    paddingLeft: 5,
    paddingTop: 5,
  },
  addQuest: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    marginTop: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    borderRadius: 10
  },
  input_view: {
    justifyContent: "center",
    width: "100%",
    marginTop: 25,
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  }
})
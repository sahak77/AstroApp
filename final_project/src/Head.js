import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';

const Head = (props) => {
    return (
    <ImageBackground source={{ uri: props.img }} style={[styles.head, { backgroundColor: props.bacColor, paddingLeft: 50 }]}><Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}><Text style={{color: "#b7b3b3", paddingRight:5,}}>{props._} </Text>{props.title}</Text></ImageBackground>
    );
}

export default Head;

const styles = StyleSheet.create({
    head: {
        width: "100%",
        height: 60,
        justifyContent: "center",
    },
});
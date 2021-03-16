import React, { useEffect, useState } from 'react';
import { Dimensions, ActivityIndicator, StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const horoscopeName = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]
let horoscopeLoadCount = horoscopeName.length - 5;

const Home = () => {
    const [data, addData] = useState([])
    const [isLoading, loading] = useState(true)

    useEffect(() => {
        func()
    }, [])
    const func = async () => {
        for (let i = 0; i < horoscopeName.length; i++) {
            const res = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${horoscopeName[i]}&day=today`, {
                "method": "POST",
                "headers": {
                    "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
                    "x-rapidapi-key": "165241c19fmsh6255cb66d9b766bp1af220jsnfb94d8352a72",
                    "content-type": "application/x-www-form-urlencoded"
                },
            })
            const fetched = await res.json()
            if (fetched) {
                const apartaments = await Object.keys(horoscopeName[i]).map(key => {
                    return {
                        key: horoscopeName[i],
                        ...fetched
                    }
                })
                if(data.length != horoscopeName.length){
                    addData(prev => [...prev, apartaments]);
                }
            }
        }
    }
    if (data.length == horoscopeLoadCount) {
        loading(false)
        horoscopeLoadCount++;
    }
    return (
        <View style={styles.container}>

            <ImageBackground source={require("../assets/img/homeBg.gif")} style={styles.content}>
                <View style={{ width: "100%", height: 60, justifyContent: "center" }}><Text style={{ fontWeight: "bold", fontSize: 30, color: "white" }}>HOME PAGE</Text></View>
                <ScrollView style={{ width: "100%", }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, alignItems: "center", paddingTop: 70, }}>


                        <View style={{ width: "100%", justifyContent: "center" }}>
                            <Image style={styles.box} source={require("../assets/img/peperimg.png")} />
                            <BlurView intensity={60} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
                                <Text style={styles.title_text}>Hello World!!!</Text>
                            </BlurView>
                            <Image source={require("../assets/img/earth.gif")} style={styles.image_box} />
                        </View>
                        <View style={styles.mini_boxes} blurRadius={90}
                            imageStyle={{ borderRadius: 15 }} source={require("../assets/img/peperimg.png")}  >
                            <View style={{ alignItems: "center", width: "100%" }}>
                                <Text style={styles.about_text}>About App</Text>

                                <Text style={{ width: "100%", paddingHorizontal: 5, color: "white" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining.
                                </Text>
                            </View>
                        </View> 
                        <View style={{ width: "100%", height: 50, }}><Text style={styles.horoscope_title}>TODAY'S HOROSCOPE</Text></View>
                        {isLoading
                            ? <View>
                                <ActivityIndicator size="large" color="white" style={{ marginTop: 5, marginBottom: 15, }} />
                            </View>
                            : <ScrollView style={styles.horizontal_scroll} horizontal={true} showsHorizontalScrollIndicator={false} >
                                {
                                    data.map(
                                        (i) =>
                                            <View key={i[0].key} style={{ width: Dimensions.get('window').width - 15, borderRightWidth: 1, borderRightColor: "#acacac", padding: 10, backgroundColor: "white" }}>
                                                <View><Text style={{ fontWeight: "bold" }}>{i[0].key}</Text></View>
                                                <View style={{ justifyContent: "center" }}><Text>{i[0].description}</Text></View>
                                            </View>
                                    )
                                }
                            </ScrollView>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    nonBlurredContent: {
        width: "100%",
        alignItems: 'center',
        justifyContent: "flex-end",
        borderRadius: 15,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 5,
        backgroundColor: '#393e46',
        paddingHorizontal: 10,
        alignItems: "center",
    },
    mini_boxes: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: "100%",
        height: 200,
        marginTop: 25,
        marginBottom: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    mini_images: {
        width: "85%",
        height: 180,
        position: "absolute",
        left: -9,
        top: -35,
        backgroundColor: "black",
        borderRadius: 20,
    },
    mini_box_title: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    head: {
        width: "100%",
        height: 60,
        backgroundColor: '#222831',
        justifyContent: "center",
        alignItems: "center",
    },
    title_text: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 30,
    },
    box: {
        width: 0,
        height: 190,
        justifyContent: "flex-end",
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    image_box: {
        width: 196,
        height: 196,
        position: "absolute",
        left: -4,
        top: -50,
        borderRadius: 96,
    },
    horizontal_scroll: {
        width: "100%",
        height: 125,
        backgroundColor: "white",
        marginBottom: 30,
    },
    horoscope_title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        color: "white"
    },
    about_text: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 7,
        color: "white",
    }
});

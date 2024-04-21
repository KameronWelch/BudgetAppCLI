import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Splash({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                {/* <ImageBackground source={require("../assets/favicon.png")} style={styles.image} /> */}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Discover Financial  Freedom Here</Text>
                <Text style={styles.subtitle}>Explore our intuitive features and begin your journey towards lasting financial security.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText1}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText2}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    imageContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    textContainer: {
        paddingHorizontal: 40,
        paddingTop: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#0047AB",
        alignSelf: "center",
        textAlign: "center",
        paddingBottom: 24,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "gray",
        alignSelf: "center",
        textAlign: "center",
        paddingBottom: 24,
    },
    text: {
        textAlign: "center",
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    button1: {
        backgroundColor: '#0047AB',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingVertical: 15,
        paddingHorizontal: 45,
    },
    button2: {
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingVertical: 15,
        paddingHorizontal: 45,
    },
    buttonText1: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
    buttonText2: {
        fontWeight: 'bold',
        color: '#0047AB',
        fontSize: 18,
    },
});

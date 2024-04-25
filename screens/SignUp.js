// import { View, Text } from 'react-native'
// import React from 'react'

// export default function SignUp() {
//   return (
//     <View>
//       <Text>SignUp</Text>
//     </View>
//   )
// }

import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';



export default function SignUp({ navigation }) {
  //Signup Variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  //Toggles if the password text input is visible or protected with stars (******)
  const toggleSecureEntry = () => {
    setSecureTextEntry(prevState => !prevState);
  };


  //Function that takes in Signup Variables and creates the account
  //firebase auth takes in mail and password and firestore db takes in extra user information
  const signUp = async () => {
    //Sets loading to true which shows the loading icon, letting the user know something is being processed
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      // Accessing the user object from the credential
      const user = response.user;

      // Setting user data in Firestore database
      await setDoc(doc(db, "users", user.uid), {
        UserID: user.uid,
        Username: username,
        Email: email,
        CreatedAt: new Date().toUTCString(),
        PlaidAccessTokens: [],
        PlaidItemIDs: [],
        LinkedAccounts: [],
        LastLoggedIn: new Date().toUTCString(),
      });

      alert('Account Successfully Created!');

      //Catches most of the errors that firebase can output and makes the message more readable
    } catch (error) {

      console.log(error);
      let errorMessage = 'Sign Up Failed: ';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'Email is already in use.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password should be at least 6 characters.';
          break;
        default:
          errorMessage += error.message;
          break;
      }

      alert(errorMessage);
      //Sets the loading back to false once its done processing
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Complete the sign up to get started</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="username"
          value={username}
          onChangeText={value => setUsername(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <View style={styles.passwordInputContainer}>

          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            inlineImageLeft='search_icon'
            textContentType="password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
            <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>


        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Create My Account</Text>
            </TouchableOpacity>
          </>
        )}


        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an Account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: '#0047AB', fontWeight: '600', fontSize: 14 }}> Log in</Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
      <StatusBar barStyle="light-content" />



    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#0047AB",
    alignSelf: "center",
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "gray",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -20 }], // Half of the icon's size
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#0047AB',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
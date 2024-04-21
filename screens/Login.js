// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Login() {
//   return (
//     <View>
//       <Text>Login</Text>
//     </View>
//   )
// }


// //100% works dont touch
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, KeyboardAvoidingView } from 'react-native';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
// import { auth } from '../firebaseConfig';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false); // Changed initial state to false

//     const signIn = async () => {
//         setLoading(true);
//         try {
//             const response = await signInWithEmailAndPassword(auth, email, password); 
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//             alert('Sign in Failed: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const signUp = async () => {
//         setLoading(true);
//         try {
//             const response = await createUserWithEmailAndPassword(auth, email, password); 
//             console.log(response);
//             alert('Check your emails!');
//         } catch (error) {
//             console.log(error);
//             alert('Sign Up Failed: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (

//         <KeyboardAvoidingView behavior='padding' style={styles.container}>
//             <Text style={styles.signup}>Login Screen</Text>
//             <TextInput
//             placeholder="Email"
//             style={styles.inputBox}
//             value={email}
//             onChangeText={value => setEmail(value)}
//             />
//             <TextInput
//             placeholder="Password"
//             style={styles.inputBox}
//             value={password}
//             onChangeText={value => setPassword(value)}
//             />

//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <>
//                     <Button title="Login" onPress={signIn} />
//                     <Button title="Create Account" onPress={signUp} />
//                 </>
//             )}
//         </KeyboardAvoidingView>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//       padding: 16,
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100%',
//     },
//     inputBox: {
//       borderWidth: 1,
//       borderColor: 'grey',
//       paddingHorizontal: 12,
//       borderRadius: 5,
//       width: '90%',
//       marginTop: 20,
//     },
//     register: {
//       width: '90%',
//       backgroundColor: '#FCAF03',
//       padding: 12,
//       borderRadius: 30,
//       alignItems: 'center',
//       marginTop: 40,
//     },
//     registerTitle: {
//       fontSize: 16,
//       color: '#000000',
//       fontWeight: '600',
//     },
//     signup: {
//       fontSize: 20,
//       color: '#000000',
//       fontWeight: '600',
//       marginBottom: 80,
//     },
//   });

// export default Login;


import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Login({ navigation }) {
  //Login Variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  //Toggles if the password text input is visible or protected with stars (******)
  const toggleSecureEntry = () => {
    setSecureTextEntry(prevState => !prevState);
  };



  //Function that takes in Login Variables and signs in the account
  //firebase auth takes in mail and password and firestore db sets the new last login date data
  const signIn = async () => {
    //Sets loading to true which shows the loading icon, letting the user know something is being processed
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      // Accessing the user object from the credential
      const user = response.user;

    // Make a POST request to your server's /api/login endpoint with email, password, and UID
    const serverResponse = await fetch(`http://${address}:8080/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid, // Include the UID in the request
      }),
    });

    const data = await serverResponse.json();

    // Check if login was successful based on the response from the server
    if (serverResponse.ok) {
      // Handle successful login
      console.log(data);
      // Redirect or perform any other action you want after successful login
    } else {
      // Handle login failure
      alert(data.errorMessage); // Display error message returned from the server
    }

      // Updates user data in Firestore database
      await updateDoc(doc(db, "users", user.uid), {
        LastLoggedIn: new Date().toUTCString(),
      });

      //Catches most of the errors that firebase can output and makes the message more readable
    } catch (error) {
      console.log(error);
      let errorMessage = 'Sign In Failed: ';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage += 'User not found. Please check your email and password.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Incorrect password. Please try again.';
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

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

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

        <TouchableOpacity>
          <Text style={{ color: '#1F41BB', fontWeight: '600', fontSize: 14, alignSelf: "flex-end" }}> Forgot your password?</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Log in To My Account</Text>
            </TouchableOpacity>
          </>
        )}


        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: '#0047AB', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
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

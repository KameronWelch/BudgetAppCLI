// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

// export default function Settings() {
//   const navigation = useNavigation();

//   const onSignOut = () => {
//     signOut(auth).catch(error => console.log('Error logging out: ', error));
//   };
//   const goToResetPasswordScreen = () => {
//     navigation.navigate('ResetPassword');
//   };
//   //screenOptions={{headerShown: false }}
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.subtitle}>General</Text>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Language</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.settingButton} onPress={goToResetPasswordScreen}>
          
//           <Text style={styles.settingButtonText}>Reset Password</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray"/>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Notifications</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <Text style={styles.subtitle}>Privacy & Security</Text>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Privacy Policy</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Security</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <Text style={styles.subtitle}>Support</Text>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>About</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Feedback</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.settingButton}>

//           <Text style={styles.settingButtonText}>Contact Us</Text>
//           <Ionicons name="chevron-forward-outline" size={24} color="gray" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
//         <Text style={styles.signOutButtonText}>Sign Out</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: "#fff",
//     justifyContent: 'center',
//   },
//   content: {
//     flex: 1,
//     marginHorizontal: 30,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: "#0047AB",
//     alignSelf: "center",
//     paddingBottom: 24,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: "black",
//     alignSelf: "flex-start",
//     paddingBottom: 24,
//   },
//   settingButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: "space-between",
//     paddingBottom: 16,
//     marginBottom: 16,
//   },
//   settingButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: "gray",
//   },
//   signOutButton: {
//     height: 58,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#0047AB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 0, // Adjusted margin
//     marginHorizontal: 20, // Adjusted margin
//   },
//   signOutButtonText: {
//     fontWeight: 'bold',
//     color: '#0047AB',
//     fontSize: 18,
//   },
//   form: {
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: 30,
//   },
// });



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Settings() {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  const goToResetPasswordScreen = () => {
    navigation.navigate('ResetPassword');
  };
  //screenOptions={{headerShown: false }}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>


        <Text style={styles.subtitle}>General</Text>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="language-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Language</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton} onPress={goToResetPasswordScreen}>
          <View>
            <Icon name="key-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Reset Password</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="notifications-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Notifications</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Privacy & Security</Text>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="shield-checkmark-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Privacy Policy</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="finger-print-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Security</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>


        <Text style={styles.subtitle}>Support</Text>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="information-circle-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>About Us</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="mail-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Feedback</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <View>
            <Icon name="chatbox-outline" size={24} color="gray" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingButtonText}>Contact Us</Text>
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </TouchableOpacity>


      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
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
    color: "black",
    alignSelf: "flex-start",
    paddingBottom: 24,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 16,
    marginBottom: 16,
  },
  // accountRow: {
  //   flexDirection: 'row',
  //   gap: 20,
  //   alignItems: 'center',
  //   borderBottomWidth: 2,
  //   borderBottomColor: 'grey',
  // },
  settingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "gray",
  },
  signOutButton: {
    height: 58,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0047AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0, // Adjusted margin
    marginHorizontal: 20, // Adjusted margin
    marginBottom: 20,
  },
  signOutButtonText: {
    fontWeight: 'bold',
    color: '#0047AB',
    fontSize: 18,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
});
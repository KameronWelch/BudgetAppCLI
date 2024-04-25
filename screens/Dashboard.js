import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function Dashboard() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentBudget, setCurrentBudget] = useState('');

  useEffect(() => {
    // Fetch the user's data from Firestore
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Assuming 'username' is the field where username is stored
          setUsername(userData.Username);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const calculateCurrentBudget = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const budgets = userData.budgets || [];
          let totalAmount = 0;
          budgets.forEach(budget => {
            totalAmount += parseFloat(budget.amount.replace(/[^\d.]/g, ''));
          });
          setCurrentBudget(totalAmount);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchUserData();
    calculateCurrentBudget();
    // Set the current date
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

  }, []);

  const goToProfileScreen = () => {
    navigation.navigate('Profile');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hello, {username}</Text>
          <TouchableOpacity style={styles.profileButton} onPress={goToProfileScreen}>
            <Icon name="person-circle-outline" size={40} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeSubText}>{currentDate}</Text>
      </View>
      {/* Card */}
      {/* <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You Have: </Text>
        <Text style={styles.cardContent}>$7,500</Text>
        <Text style={styles.cardContent}>Left out of $50,000 budgeted</Text>
      </View> */}

      <Text style={styles.sectionTitle}>Budget</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You Have: </Text>
        {/* <Text style={styles.cardContent}>$1,500</Text> */}
        <Text style={styles.cardContent}>${currentBudget} left out of a total of ${currentBudget} budgeted</Text>
      </View>

      {/* <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You Have: </Text>
        <Text style={styles.cardContent}>$7,500</Text>
        <Text style={styles.cardContent}>Left out of $50,000 budgeted</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>Type of Account: </Text>
          <Text style={styles.subtitle2}>Savings </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>Account No. </Text>
          <Text style={styles.subtitle2}>1234567890 </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>Available Balance: </Text>
          <Text style={styles.subtitle2}>$10000.00 </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.subtitle}>Date added: </Text>
          <Text style={styles.subtitle2}>4/1/2024, 2:18 PM </Text>
        </View>
      </View> */}
<Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.cardHeader}>View Transactions </Text>
          <TouchableOpacity>
            <Icon style={{ flex: 1 }} name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.infoRow2}>
          <View>
            <Icon name="person-circle-outline" size={40} color="gray" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>Kameron Welch </Text>
            <Text style={styles.transactionText}>Bank Name </Text>
          </View>

          <View>
            <Text style={[styles.transactionAmount, { color: 'green' }]}>+$20.00 </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow2}>
          <View>
            <Icon name="person-circle-outline" size={40} color="gray" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>Kameron Welch </Text>
            <Text style={styles.transactionText}>Bank Name </Text>
          </View>

          <View>
            <Text style={[styles.transactionAmount, { color: 'red' }]}>-$93.00 </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow2}>
          <View>
            <Icon name="person-circle-outline" size={40} color="gray" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>Kameron Welch </Text>
            <Text style={styles.transactionText}>Bank Name </Text>
          </View>

          <View>
            <Text style={[styles.transactionAmount, { color: 'red' }]}>-$298.00 </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow2}>
          <View>
            <Icon name="person-circle-outline" size={40} color="gray" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>Kameron Welch </Text>
            <Text style={styles.transactionText}>Bank Name </Text>
          </View>

          <View>
            <Text style={[styles.transactionAmount, { color: 'green' }]}>+$350.00 </Text>
          </View>
        </TouchableOpacity>

      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  infoView: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeSubText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  profileButton: {

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
  },
  infoRow: {
    //backgroundColor: "#fff",
    flexDirection: 'row',
    gap: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderBottomColor: 'grey',

  },
  infoRow2: {
    //backgroundColor: "#fff",
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'grey',


},
subtitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: "gray",
  alignSelf: "center",
  paddingBottom: 6,
  paddingTop: 6,
},
subtitle2: {
  fontSize: 18,
  fontWeight: '',
  color: "black",
  alignSelf: "center",
  paddingBottom: 6,
},
transactionTitle:{
  fontSize: 18,
  paddingTop: 6,
},
transactionText:{
  fontSize: 18,
  paddingBottom: 6,
  color: "gray",
},
transactionAmount:{
  fontSize: 18,
},
});
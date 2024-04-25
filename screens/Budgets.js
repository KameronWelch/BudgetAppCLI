import { View, Text, TouchableOpacity, StyleSheet, FlatList,ScrollView  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc, addDoc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function Budgets() {
  const navigation = useNavigation();
  const [userBudgets, setUserBudgets] = useState([]);

  const goToNewBudgetScreen = () => {
    navigation.navigate('NewBudget');
  };

  // // Fetch user's budget data from Firestore
  // useEffect(() => {
  //   const fetchBudgetData = async () => {
  //     try {
  //       const userId = auth.currentUser.uid;
  //       const userRef = doc(db, 'users', userId);
  //       const userDoc = await getDoc(userRef);

  //       if (userDoc.exists()) {
  //         const userData = userDoc.data();
  //         const budgets = userData.budgets || [];
  //         setUserBudgets(budgets);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user budget data:', error);
  //     }
  //   };

  //   fetchBudgetData();
  // }, []);

   // Fetch user's budget data from Firestore
   useEffect(() => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const budgets = userData.budgets || [];
        setUserBudgets(budgets);
      }
    });

    return () => unsubscribe();
  }, []);


    // Your default text to display when the FlatList is empty
    const renderEmptyComponent = () => (
      <View style={styles.emptyRender}>
        <Text style={styles.emptyRenderText}>Looks like you havent added an budget yet.</Text>
        <Text style={styles.emptyRenderText}>Click the Add New Budget button to get started!</Text>
      </View>
    );
    // // Render individual budget item
    // const renderBudgetItem = ({ item }) => (
    //   <View style={styles.card}>
    //     <Text style={styles.cardText}>Category: {item.category}</Text>
    //     <Text style={styles.cardText}>Frequency: {item.frequency}</Text>
    //     <Text style={styles.cardText}>Amount: {item.amount} left out of {item.amount}</Text>
    //   </View>
    // );

    const renderBudgetItem = ({ item, index }) => (
      <View style={styles.card}>
        <Text style={styles.cardText}>Category: {item.category}</Text>
        <Text style={styles.cardText}>Frequency: {item.frequency}</Text>
        <Text style={styles.cardText}>Amount: {item.amount} left out of {item.amount}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBudget(index)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
    
    const handleDeleteBudget = async (budgetIndex) => {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
    
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const budgets = userData.budgets || [];
          const updatedBudgets = [...budgets.slice(0, budgetIndex), ...budgets.slice(budgetIndex + 1)];
          
          await setDoc(userRef, { budgets: updatedBudgets }, { merge: true });
          setUserBudgets(updatedBudgets); // Update state to reflect the deleted budget
        }
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    };
  return (
    <View style={styles.container}>
      
      <FlatList
        style={styles.cardContainer}
        data={userBudgets}
        renderItem={renderBudgetItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />

      <TouchableOpacity style={styles.addBudgetButton} onPress={goToNewBudgetScreen}>

        <View style={{ flex: 1 }}>
          <Text style={styles.buttonText}>Add New Budget</Text>
        </View>

      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    // justifyContent: 'center',
    paddingTop: 20,
    //paddingHorizontal: 30,
  },
  cardContainer:{
    paddingHorizontal: 30
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
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  addBudgetButton: {
    backgroundColor: '#0047AB',
    borderRadius: 10,
    height: 58,
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  emptyRender: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyRenderText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
  },
});
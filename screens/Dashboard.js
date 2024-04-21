import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Dashboard() {
  const navigation = useNavigation();
  const goToProfileScreen = () => {
    navigation.navigate('Profile');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, Kameron</Text>
        <TouchableOpacity style={styles.profileButton} onPress={goToProfileScreen}>
          <Icon name="person-circle-outline" size={40} color="gray"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardHeader}>Overview</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 1</Text>
        {/* Content for Card 1 */}
      </View>

      <Text style={styles.cardHeader}>Budgets</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 2</Text>
        {/* Content for Card 2 */}
      </View>

      <Text style={styles.cardHeader}>Recent Transactions</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Card 3</Text>
        {/* Content for Card 2 */}
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
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});
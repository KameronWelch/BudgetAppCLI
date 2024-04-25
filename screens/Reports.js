// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Reports() {
//   return (
//     <View>
//       <Text>Reports</Text>
//     </View>
//   )
// }

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Reports = () => {
  const [goal, setGoal] = useState('');
  const [submittedGoals, setSubmittedGoals] = useState([]);

  const handleGoalChange = (text) => {
    setGoal(text);
  };

  const handleSubmit = () => {
    if (goal !== '') {
      const newGoal = { id: Date.now(), goal: goal, color: getRandomColor() };
      setSubmittedGoals([...submittedGoals, newGoal]);
      setGoal('');
    }
  };

  const handleDelete = (id) => {
    const newGoals = submittedGoals.filter(item => item.id !== id);
    setSubmittedGoals(newGoals);
  };

  const getRandomColor = () => {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    // Construct color string in hex format
    return `rgb(${red},${green},${blue})`;
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.infoView}>

      <View style={styles.itemRow}>
        <View style={[styles.colorDot, { backgroundColor: item.color }]}></View>
        <Text style={styles.itemText}>Goal: {item.goal}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete Goal</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.infoView}>
        {/* Enter Goal */}
        <Text style={styles.title}>Enter a Financial Goal</Text>
        <Text style={styles.subtitle}>Financial Goals help to keep track of your most important money goals.</Text>

        <TextInput
          value={goal}
          onChangeText={handleGoalChange}
          placeholder={'Type here to enter a goal'}
          style={styles.input}
        />
      </View>


      {/* Submit Button */}
      <TouchableOpacity style={styles.addGoalButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </TouchableOpacity>
      {/* <Button
        title='Submit'
        onPress={handleSubmit}
      /> */}

      {/* Display the submitted goals */}
      <FlatList
        data={submittedGoals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    justifyContent: 'center',
  },
  infoView: {
    padding: 10
  },
  input: {
    //backgroundColor: "#F6F7FB",
    backgroundColor: "white",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  itemContainer: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "gray",
    alignSelf: "baseline",
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5, // Make it a circle
    marginRight: 10, // Add some margin to separate the dot and the text
    marginTop:7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#0047AB",
    alignSelf: "stretch",
    paddingBottom: 12,
    //paddingLeft: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "gray",
    alignSelf: "baseline",
    paddingBottom: 12,
    //paddingLeft: 24,
  },
  addGoalButton: {
    backgroundColor: '#0047AB',
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});

export default Reports;
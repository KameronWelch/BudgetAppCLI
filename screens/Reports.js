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
      const newGoal = { id: Date.now(), goal: goal, color: getRandomColor()};
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
    <View style={styles.itemContainer}>
      <View style={[styles.colorDot, { backgroundColor: item.color }]}></View>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>Goals: {item.goal}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Enter Goal */}
      <Text>Enter a Goal</Text>
      <TextInput
        value={goal}
        onChangeText={handleGoalChange}
        placeholder={'Enter goal'}
        style={styles.inputStyle}
      />
      
      {/* Submit Button */}
      <Button
        title='Submit'
        onPress={handleSubmit}
      />
      
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
  inputStyle: {
    width: '80%',
    height: 44,
    padding: 10,
    marginVertical: 10,
  },
  itemContainer: {
    marginTop: 20,
  },
  itemText: {
    fontSize: 18,
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
  },
});

export default Reports;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { doc, setDoc, getDoc, addDoc } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';

const categoryData = [
    { label: 'Housing', value: 'Housing' },
    { label: 'Transportation', value: 'Transportation' },
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Dining out', value: 'Dining out' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Health and fitness', value: 'Health and fitness' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Debt payments', value: 'Debt payments' },
    { label: 'Savings', value: 'Savings' },
    { label: 'Utilities', value: 'Utilities' },
    { label: 'Education', value: 'Education' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Personal care', value: 'Personal care' },
    { label: 'Gifts & donations', value: 'Gifts & donations' },
    { label: 'Investments', value: 'Investments' },
    { label: 'Taxes', value: 'Taxes' },
    { label: 'Home maintenance', value: 'Home maintenance' },
    { label: 'Pets', value: 'Pets' },
    { label: 'Childcare', value: 'Childcare' },
    { label: 'Subscriptions', value: 'Subscriptions' },
    { label: 'Auto expenses', value: 'Auto expenses' },
    { label: 'Home improvement', value: 'Home improvement' },
    { label: 'Charity', value: 'Charity' },
    { label: 'Other', value: 'Other' },
];
const frequencyData = [
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Bi-Weekly', value: 'Bi-Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Semi-Annually', value: 'Semi-Annually' },
    { label: 'Annually', value: 'Annually' },
];

export default function NewBudget() {
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [category, setCategory] = useState(null);
    const [amount, setAmount] = useState('');
    const [submittedData, setSubmittedData] = useState([]);
    const [value, setValue] = useState(null);

    //Item renderer for the dropdown options
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value &&
                    (
                        <Icon style={styles.icon} name="checkmark-outline" size={20} color="#0047AB" />
                    )
                }
            </View>
        );
    };

    const handleAmountChange = (text) => {
                // Remove non-numeric characters from input
                const numericValue = text.replace(/[^0-9.]/g, '');
                
                // Format input to have a $ and decima
                let formattedValue = '$' + numericValue;    
                setAmount(formattedValue);

    };

    const handleIncrement = () => {
        setAmount(prevAmount => {
            // Remove the dollar sign ($) from the previous amount
            const intValue = parseInt(prevAmount.replace(/\$/g, ''), 10);
            // Add 25 to the integer value
            const newAmount = isNaN(intValue) ? 0 : intValue + 25;
            // Convert the new amount to a string with the dollar sign ($)
            return `$${newAmount}`;
        });
    };

    const handleDecrement = () => {
        setAmount(prevAmount => {
            // Remove the dollar sign ($) from the previous amount
            const intValue = parseInt(prevAmount.replace(/\$/g, ''));
            // Ensure the amount is at least 25 and then subtract 25 from it
            const newAmount = intValue >= 25 ? intValue - 25 : 0;
            // Convert the new amount to a string with the dollar sign ($)
            return `$${newAmount}`;
        });
    };


    const getRandomColor = () => {
        // Generate random RGB values
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        // Construct color string in hex format
        return `rgb(${red},${green},${blue})`;
    };

    const handleSubmit = async () => {
        if (frequency !== '' && category !== '' && amount !== '') {
            const newData = { frequency: frequency, category: category, amount: amount, color: getRandomColor() };
            setSubmittedData([...submittedData, newData]);

        // Update user document in Firestore
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                // If user document exists, update the budget array
                const userData = userDoc.data();
                const budgetArray = userData.budgets || []; // Get existing budgets or initialize empty array
                budgetArray.push(newData); // Add new budget data to the array

                // Update the user document with the updated budget array
                await setDoc(userRef, { ...userData, budgets: budgetArray });

                console.log('Budget added successfully');
            } else {
                console.error('User document does not exist');
            }
        } catch (error) {
            console.error('Error adding budget: ', error);
        }
            setFrequency('');
            setCategory('');
            setAmount('');
            // setSelectedDate(null);
        }
    };


    const handleDelete = (id) => {
        const newData = submittedData.filter(item => item.id !== id);
        setSubmittedData(newData);
    };

    const renderDataItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={[styles.colorDot, { backgroundColor: item.color }]}></View>
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>Budget Frequency: {item.frequency}</Text>
                <Text style={styles.itemText}>Category: {item.category}</Text>
                <Text style={styles.itemText}>Amount: {item.amount}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container} >
            <View style={styles.infoView}>
                <Text style={styles.title} >Create Your Budget</Text>
                <Text style={styles.subtitle}>To make a budget, select a budget frequency, budget category, and a budget amount.</Text>
            </View>
            <View style={styles.budgetView}>
                <Text style={styles.text}>Enter Budget Frequency</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={frequencyData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select a frequency"
                    searchPlaceholder="Search..."
                    value={frequency}
                    onChange={item => {
                        setFrequency(item.value);
                    }}
                    renderLeftIcon={() => (
                        <Icon style={styles.icon} name="calendar-outline" size={20} color="#0047AB" />
                    )}
                    renderItem={renderItem}
                />
                <Text style={styles.text}>Enter Budget Category</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={categoryData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select a category"
                    searchPlaceholder="Search..."
                    value={category}
                    onChange={item => {
                        setCategory(item.value);
                    }}
                    renderLeftIcon={() => (
                        <Icon style={styles.icon} name="pricetags-outline" size={20} color="#0047AB" />
                    )}
                    renderItem={renderItem}
                />


                <Text style={styles.text}>Enter Budget Amount</Text>

                <View style={styles.amountButton}>
                    <TouchableOpacity onPress={handleDecrement}>
                        <View style={styles.amountSideButtons}>
                            <Icon name="remove-outline" size={24} color="#0047AB" />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        value={amount}
                        onChangeText={handleAmountChange}
                        placeholder={'$0'}
                        keyboardType='numeric'

                        style={styles.inputStyle}
                    />
                    <TouchableOpacity onPress={handleIncrement}>
                        <View style={styles.amountSideButtons}>
                            <Icon name="add-outline" size={24} color="#0047AB" />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Enter Amount */}


            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.addBudgetButton} onPress={handleSubmit}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.buttonText}>Add New Budget</Text>
                </View>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "#fff",
        justifyContent: 'center',
    },
    inputStyle: {
        // backgroundColor: "#F6F7FB",
        
        fontWeight: 'bold',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    infoView: {
        padding: 10
    },
    budgetView: {
        padding: 10,
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
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "gray",
        alignSelf: "center",
    },
    itemContainer: {
        marginTop: 20,
    },
    itemText: {
        fontSize: 18,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5, // Make it a circle
        marginRight: 10, // Add some margin to separate the dot and the text
    },
    addBudgetButton: {
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
    },
    amountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
        gap: 10,
        paddingBottom: 16,
        marginBottom: 16,
    },
    amountSideButtons: {
        alignItems: 'center',
        marginBottom: 16,
    },
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

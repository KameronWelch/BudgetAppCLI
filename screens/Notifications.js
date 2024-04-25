import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationSwitch = ({ label, initialValue }) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.notifcationRow}>
            <Text style={styles.notifcationText}>{label}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#0047AB' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default function Notifications() {
    return (
        <View style={styles.container}>
            <NotificationSwitch label="Transaction Alerts" initialValue={false} />
            <NotificationSwitch label="Login Alerts" initialValue={false} />
            <NotificationSwitch label="Over-Spending Alert" initialValue={false} />
            <NotificationSwitch label="Upcoming Budget Limit" initialValue={false} />
            {/* Add more NotificationSwitch components here if needed */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    notifcationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    notifcationText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

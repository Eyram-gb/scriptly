import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useStore } from '../store/useStore';
import VerseList from '../components/VerseList';

const HistoryScreen: React.FC = () => {
    const accepted = useStore((state) => state.accepted);

    if (accepted.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No accepted verses yet.</Text>
            </View>
        );
    }

    return <VerseList data={accepted} />;
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HistoryScreen;

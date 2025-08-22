import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Suggestion } from '../types';
// import { Suggestion } from '../types';

interface Props {
    data: Suggestion[];
}

const VerseList: React.FC<Props> = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.snippet}>{item.snippet}</Text>
                    <Text style={styles.reason}>{item.reason}</Text>
                </View>
            )}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    item: {
        backgroundColor: '#181818',
        borderRadius: 10,
        padding: 14,
        marginVertical: 6,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    snippet: {
        color: '#fff',
        fontSize: 15,
        marginVertical: 2,
    },
    reason: {
        color: '#B0B0B0',
        fontSize: 13,
    },
});

export default VerseList;

// export interface Suggestion {
//     id: string;
//     title: string;
//     snippet: string;
//     reason: string;
// }

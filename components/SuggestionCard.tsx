import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Suggestion } from '../types';

// export interface Suggestion {
//     id: string;
//     title: string;
//     snippet: string;
//     reason: string;
// }

interface Props {
    suggestion: Suggestion;
    onPin: () => void;
    onAccept: () => void;
    isPinned?: boolean;
}

const SuggestionCard: React.FC<Props> = ({ suggestion, onPin, onAccept, isPinned }) => {
    const handleCopy = () => {
        Clipboard.setStringAsync(suggestion.snippet);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{suggestion.title}</Text>
                <TouchableOpacity onPress={onPin}>
                    <Ionicons name={isPinned ? 'star' : 'star-outline'} size={22} color="#FFD700" />
                </TouchableOpacity>
            </View>
            <Text style={styles.snippet}>{suggestion.snippet}</Text>
            <Text style={styles.reason}>{suggestion.reason}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onAccept} style={styles.actionBtn}>
                    <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCopy} style={styles.actionBtn}>
                    <Ionicons name="copy" size={22} color="#B0B0B0" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#181818',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    snippet: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 4,
    },
    reason: {
        color: '#B0B0B0',
        fontSize: 14,
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    actionBtn: {
        marginLeft: 12,
    },
});

export default SuggestionCard;

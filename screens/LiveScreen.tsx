import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useStore } from '../store/useStore';
import SuggestionCard from '../components/SuggestionCard';

const LiveScreen: React.FC = () => {
    const suggestions = useStore((state) => state.suggestions);
    const pinSuggestion = useStore((state) => state.pinSuggestion);
    const acceptSuggestion = useStore((state) => state.acceptSuggestion);
    const pinned = useStore((state) => state.pinned);

    if (suggestions.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No live suggestions.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={suggestions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <SuggestionCard
                    suggestion={item}
                    onPin={() => pinSuggestion(item.id)}
                    onAccept={() => acceptSuggestion(item.id)}
                    isPinned={pinned.includes(item.id)}
                />
            )}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#000',
        minHeight: '100%',
    },
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

export default LiveScreen;

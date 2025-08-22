import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { mockSuggestions } from '../mock/mockSuggestions';
import VerseList from '../components/VerseList';

const SearchScreen: React.FC = () => {
    const [query, setQuery] = useState('');
    const filtered = mockSuggestions.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.snippet.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search verses..."
                placeholderTextColor="#B0B0B0"
                value={query}
                onChangeText={setQuery}
            />
            <VerseList data={filtered} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    input: {
        backgroundColor: '#181818',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
});

export default SearchScreen;

import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useStore } from '../store/useStore';
import SuggestionCard from '../components/SuggestionCard';

const LiveScreen: React.FC = () => {
    const suggestions = useStore((state) => state.suggestions);
    const pinSuggestion = useStore((state) => state.pinSuggestion);
    const acceptSuggestion = useStore((state) => state.acceptSuggestion);
    const pinned = useStore((state) => state.pinned);

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const handleRecord = async () => {
        if (isRecording) {
            // Stop recording
            setIsRecording(false);
            if (recording) {
                await recording.stopAndUnloadAsync();
                setRecording(null);
            }
        } else {
            // Start recording
            try {
                const { status } = await Audio.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access microphone is required!');
                    return;
                }
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const rec = new Audio.Recording();
                await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                await rec.startAsync();
                setRecording(rec);
                setIsRecording(true);
            } catch (err) {
                alert('Failed to start recording: ' + err);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
                <Text style={styles.recordButtonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
            {suggestions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No live suggestions.</Text>
                </View>
            ) : (
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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#000',
        minHeight: '100%',
    },
    recordButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 32,
        alignItems: 'center',
        margin: 16,
    },
    recordButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

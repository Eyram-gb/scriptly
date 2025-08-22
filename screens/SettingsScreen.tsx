import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '../store/useStore';

const VERSIONS = ['KJV', 'NIV', 'ESV', 'NLT'];

const SettingsScreen: React.FC = () => {
    const bibleVersion = useStore((state) => state.bibleVersion);
    const setBibleVersion = useStore((state) => state.setBibleVersion);
    const transcriptEnabled = useStore((state) => state.transcriptEnabled);
    const setTranscriptEnabled = useStore((state) => state.setTranscriptEnabled);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Bible Version</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={bibleVersion}
                    onValueChange={setBibleVersion}
                    dropdownIconColor="#fff"
                    style={styles.picker}
                >
                    {VERSIONS.map((v) => (
                        <Picker.Item key={v} label={v} value={v} color="#fff" />
                    ))}
                </Picker>
            </View>
            <View style={styles.switchRow}>
                <Text style={styles.label}>Show Transcript</Text>
                <Switch
                    value={transcriptEnabled}
                    onValueChange={setTranscriptEnabled}
                    trackColor={{ false: '#444', true: '#4CAF50' }}
                    thumbColor={transcriptEnabled ? '#fff' : '#B0B0B0'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
    },
    pickerWrapper: {
        backgroundColor: '#181818',
        borderRadius: 8,
        marginBottom: 24,
    },
    picker: {
        color: '#fff',
        height: 44,
        width: '100%',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default SettingsScreen;

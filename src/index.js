import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `League of ${Date.now()}`,
            owner: 'Thiago Almeida'
        });

        setProjects([ ... projects, response.data ]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159C1"/>

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button} 
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold'
    },
    project: {
        color: '#fff',
        fontSize: 30
    },
    button: {
       backgroundColor: '#fff',
       margin: 20,
       height: 40,
       borderRadius: 4,
       justifyContent: 'center',
       alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});
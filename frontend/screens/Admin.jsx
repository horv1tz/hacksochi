import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Admin = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('data');
                if (jsonValue !== null) {
                    const parsedData = JSON.parse(jsonValue);
                    setTasks([parsedData]); // Преобразование объекта в массив для использования в FlatList
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleChangeStatus = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: task.status === 1 ? 0 : 1 };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTaskItem = ({ item }) => {
        if (item.status === 0) {
            return null;
        }

        return (
            <View style={styles.taskContainer}>
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskInfo}>{item.createdAt}</Text>
                <Text style={styles.taskInfo}>{item.storeName}</Text>
                <Image source={{ uri: item.image }} style={styles.taskImage} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleChangeStatus(item.id)}
                >
                    <Text style={styles.buttonText}>Подтвердить</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    taskContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskInfo: {
        marginBottom: 5,
    },
    taskImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});

export default Admin;

import React, { useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Admin = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            createdAt: '2024-04-13',
            name: 'Task 1',
            storeName: 'Store A',
            image: 'https://example.com/image1.jpg',
            status: 1,
        },
        {
            id: 2,
            createdAt: '2024-04-12',
            name: 'Task 2',
            storeName: 'Store B',
            image: 'https://example.com/image2.jpg',
            status: 0,
        },
        {
            id: 3,
            createdAt: '2024-04-11',
            name: 'Task 3',
            storeName: 'Store C',
            image: 'https://example.com/image3.jpg',
            status: 1,
        },
    ]);

    const handleChangeStatus = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: task.status === 1 ? 0 : 1 }; // Переключаем статус
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTaskItem = ({ item }) => {
        if (item.status === 0) {
            return null; // Не отображать задачу, если статус равен нулю
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
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    taskContainer: {
        marginBottom: 20,
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
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Admin;

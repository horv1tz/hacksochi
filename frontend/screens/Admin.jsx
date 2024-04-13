import React, { useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Admin = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            createdAt: '2024-04-13',
            name: 'Несоответствие цены',
            storeName: 'Магнит',
            image: 'https://sun9-30.userapi.com/impg/OWf3Nmw--Pci9ivkh5owCqtdu-Gocv2bNzN3Mg/_6L3t_Lh3Ok.jpg?size=960x1280&quality=96&sign=b9406615117e55190dffe728d5d190d3&type=album',
            status: 1,
        },
        {
            id: 2,
            createdAt: '2024-04-12',
            name: 'Несоответствие цены',
            storeName: 'Пятерочка',
            image: 'https://sun9-35.userapi.com/impg/g02pjN7jd7dU9-6fBgB5veWzR8uy1unNOlqfCA/U6-SUZ-7_SM.jpg?size=960x1280&quality=96&sign=eed8c29b4ba415deeccb9553522a6ef7&type=album',
            status: 1,
        },
        {
            id: 3,
            createdAt: '2024-04-11',
            name: 'Несоответствие цены',
            storeName: 'Магнит',
            image: 'https://sun1-85.userapi.com/impg/kghrnUy4WlRzuXQgpYa4ptSuP2zmVTxA_dhAew/v3fxzqeiQ1g.jpg?size=960x1280&quality=96&sign=7ffc54e7eaf65a741f8741d372fdc721&type=album',
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

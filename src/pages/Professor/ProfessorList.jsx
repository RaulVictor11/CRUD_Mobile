import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import API from '../../utils/api';
import { Feather, AntDesign } from '@expo/vector-icons';

// FUNÇÃO PRINCIPAL

const ProfessorList = ({ navigation }) => {
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar todos os professores (GET)
    const fetchProfessores = async () => {
        try {
            setLoading(true);
            const response = await API.get('/professor');
            setProfessores(response.data);
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de professores.');
        } finally {
            setLoading(false);
        }
    };

    // Função para deletar um professor (DELETE)
    const handleDelete = async (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este professor?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            await API.delete(`/professor/${id}`);
                            Alert.alert('Sucesso', 'Professor excluído com sucesso!');
                            fetchProfessores(); // Recarrega a lista
                        } catch (error) {
                            console.error('Erro ao excluir:', error);
                            Alert.alert('Erro', 'Não foi possível excluir o professor.');
                        }
                    },
                },
            ]
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchProfessores();
        }, [])
    );

    // Componente de Item da Lista (Linha)
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <View style={styles.textContainer}>
                <Text style={styles.nome}>{item.Nome}</Text>
                <Text style={styles.cpf}>CPF: {item.CPF}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ProfessorEdit', { professor: item })}
                    style={styles.editButton}
                >
                    <Feather name="edit" size={20} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleDelete(item.ID_Professor)}
                    style={styles.deleteButton}
                >
                    <Feather name="trash-2" size={20} color="#dc3545" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
            </View>
        );
    }

    if (professores.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Nenhum professor cadastrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={professores}
                keyExtractor={item => String(item.ID_Professor)}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textContainer: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: '700',
        color: '#343a40',
    },
    cpf: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    editButton: {
        padding: 8,
    },
    deleteButton: {
        padding: 8,
        marginLeft: 5,
    },
});

export default ProfessorList;

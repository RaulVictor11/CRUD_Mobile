import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import API from '../../utils/api';
import { Feather } from '@expo/vector-icons'; 

// -------------------------------------------------------------------
// FUNÇÃO PRINCIPAL
// -------------------------------------------------------------------

const MateriaList = ({ navigation }) => {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar todas as matérias (GET)
    const fetchMaterias = async () => {
        try {
            setLoading(true);
            const response = await API.get('/materia');
            setMaterias(response.data);
        } catch (error) {
            console.error('Erro ao buscar matérias:', error);
            Alert.alert('Erro', 'Não foi possível carregar a lista de matérias.');
        } finally {
            setLoading(false);
        }
    };

    // Função para deletar uma matéria (DELETE)
    const handleDelete = async (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esta matéria?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            // A chave primária da matéria é ID_Materia
                            await API.delete(`/materia/${id}`); 
                            Alert.alert('Sucesso', 'Matéria excluída com sucesso!');
                            fetchMaterias(); // Recarrega a lista
                        } catch (error) {
                            console.error('Erro ao excluir:', error);
                            Alert.alert('Erro', 'Não foi possível excluir a matéria.');
                        }
                    },
                },
            ]
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchMaterias();
        }, [])
    );

    // Componente de Item da Lista (Linha)
    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <View style={styles.textContainer}>
                <Text style={styles.nome}>{item.Nome}</Text>
                <Text style={styles.details}>Carga Horária: {item.Carga_Horaria}h</Text>
                {/* A chave estrangeira é ID_Professor */}
                <Text style={styles.details}>Professor ID: {item.ID_Professor}</Text> 
            </View>
            <View style={styles.actions}>
                {/* No momento, o foco será na listagem e deleção para simplificar */}
                <TouchableOpacity 
                    onPress={() => handleDelete(item.ID_Materia)}
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

    if (materias.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Nenhuma matéria cadastrada.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={materias}
                keyExtractor={item => String(item.ID_Materia)}
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
        elevation: 2, 
        shadowColor: '#000', 
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
    details: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    actions: {
        marginLeft: 10,
    },
    deleteButton: {
        padding: 8,
    },
});

export default MateriaList;

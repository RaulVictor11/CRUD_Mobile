import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API from '../../utils/api';

// FUNÇÃO PRINCIPAL

const ProfessorEdit = ({ route, navigation }) => {
    const { professor } = route.params;

    const [Nome, setNome] = useState(professor.Nome);
    const [CPF, setCPF] = useState(professor.CPF);
    const [loading, setLoading] = useState(false);

    const id = professor.ID_Professor; 

    // Função para atualizar o professor (PUT)
    const handleUpdate = async () => {
        if (!Nome || !CPF || CPF.length !== 11) {
            Alert.alert('Atenção', 'Preencha o Nome e o CPF corretamente (11 dígitos).');
            return;
        }

        setLoading(true);

        try {
            await API.put(`/professor/${id}`, {
                Nome, 
                CPF,  
            });
            
            Alert.alert('Sucesso', 'Professor atualizado com sucesso!');
            
            // Retorna para a lista, que se auto-atualizará
            navigation.goBack(); 

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            const errorMessage = error.response?.data?.message || 'Erro de conexão com o servidor.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>ID do Professor</Text>
            <TextInput
                style={[styles.input, styles.readOnly]}
                value={String(id)}
                editable={false} // ID não pode ser editado
            />

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Maria da Silva"
                value={Nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>CPF (11 dígitos)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 12345678901"
                keyboardType="numeric"
                maxLength={11}
                value={CPF}
                onChangeText={setCPF}
            />
            
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleUpdate} 
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Atualizar Professor</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    readOnly: {
        backgroundColor: '#e9ecef',
        color: '#6c757d',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfessorEdit;

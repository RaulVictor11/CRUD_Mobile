import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API from '../../utils/api'; 

// FUNÇÃO PRINCIPAL

const ProfessorForm = ({ navigation }) => {
    const [Nome, setNome] = useState('');
    const [CPF, setCPF] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para cadastrar o professor (POST)
    const handleSave = async () => {
        if (!Nome || !CPF || CPF.length !== 11) {
            Alert.alert('Atenção', 'Preencha o Nome e o CPF corretamente (11 dígitos).');
            return;
        }

        setLoading(true);

        try {
            await API.post('/professor', {
                Nome, 
                CPF, 
            });
            
            Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
            
            navigation.goBack(); 

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            const errorMessage = error.response?.data?.message || 'Erro de conexão com o servidor.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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
                onPress={handleSave} 
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar Professor</Text>
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
    button: {
        backgroundColor: '#28a745',
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

export default ProfessorForm;

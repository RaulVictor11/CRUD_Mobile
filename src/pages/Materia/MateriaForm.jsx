import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API from '../../utils/api';

// FUNÇÃO PRINCIPAL

const MateriaForm = ({ navigation }) => {
    // Estados para os campos (Nome, Carga_Horaria) e a FK (ID_Professor)
    const [Nome, setNome] = useState('');
    const [Carga_Horaria, setCargaHoraria] = useState('');
    const [ID_Professor, setIDProfessor] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para cadastrar a matéria (POST)
    const handleSave = async () => {
        if (!Nome || !Carga_Horaria || !ID_Professor || isNaN(ID_Professor) || isNaN(Carga_Horaria)) {
            Alert.alert('Atenção', 'Preencha todos os campos corretamente. ID do Professor e Carga Horária devem ser números.');
            return;
        }

        setLoading(true);

        try {
            await API.post('/materia', {
                Nome,
                Carga_Horaria: parseInt(Carga_Horaria), 
                ID_Professor: parseInt(ID_Professor),   
            });
            
            Alert.alert('Sucesso', 'Matéria cadastrada com sucesso!');
            navigation.goBack(); 

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            const errorMessage = error.response?.data?.message || 'Erro de conexão ou ID do Professor inexistente.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome da Matéria</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Matemática Discreta"
                value={Nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>Carga Horária (em horas)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 60"
                keyboardType="numeric"
                value={Carga_Horaria}
                onChangeText={setCargaHoraria}
            />

            <Text style={styles.label}>ID do Professor (Chave Estrangeira)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 1"
                keyboardType="numeric"
                value={ID_Professor}
                onChangeText={setIDProfessor}
            />
            
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleSave} 
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar Matéria</Text>
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
        backgroundColor: '#6c757d',
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

export default MateriaForm;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Importações dos componentes de Professor
import ProfessorList from './src/pages/Professor/ProfessorList.jsx';
import ProfessorForm from './src/pages/Professor/ProfessorForm.jsx';
import ProfessorEdit from './src/pages/Professor/ProfessorEdit.jsx';

// Importações dos componentes de Matéria
import MateriaList from './src/pages/Materia/MateriaList.jsx';
import MateriaForm from './src/pages/Materia/MateriaForm.jsx';

const Stack = createStackNavigator();

// COMPONENTE HOME

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.homeTitle}>Gestão de Escola</Text>
            <Text style={styles.homeSubtitle}>Professores e Matérias</Text>

            <TouchableOpacity 
                style={styles.homeButton} 
                onPress={() => navigation.navigate('ProfessorList')}
            >
                <MaterialIcons name="person" size={24} color="#fff" />
                <Text style={styles.homeButtonText}>Gerenciar Professores</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.homeButton, styles.materiaButton]} 
                onPress={() => navigation.navigate('MateriaList')}
            >
                <MaterialIcons name="menu-book" size={24} color="#fff" />
                <Text style={styles.homeButtonText}>Gerenciar Matérias</Text>
            </TouchableOpacity>
        </View>
    );
};

// -------------------------------------------------------------------
// COMPONENTE PRINCIPAL (APP)
// -------------------------------------------------------------------

const App = () => {
    // Configuração de estilo comum para todas as telas (Header)
    const screenOptions = {
        headerStyle: {
            backgroundColor: '#007bff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                {/* Tela Principal */}
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ title: 'Menu Principal' }} 
                />

                {/* --- ROTAS DE PROFESSOR --- */}
                <Stack.Screen 
                    name="ProfessorList" 
                    component={ProfessorList}
                    options={({ navigation }) => ({
                        title: 'Lista de Professores',
                        // Botão para adicionar (navega para o formulário)
                        headerRight: () => (
                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('ProfessorForm')}>
                                <MaterialIcons name="add" size={24} color="#fff" />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="ProfessorForm" component={ProfessorForm} options={{ title: 'Novo Professor' }} />
                <Stack.Screen name="ProfessorEdit" component={ProfessorEdit} options={{ title: 'Editar Professor' }} />


                {/* --- ROTAS DE MATÉRIA --- */}
                <Stack.Screen 
                    name="MateriaList" 
                    component={MateriaList} 
                    options={({ navigation }) => ({
                        title: 'Lista de Matérias',
                        headerRight: () => (
                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('MateriaForm')}>
                                <MaterialIcons name="add" size={24} color="#fff" />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="MateriaForm" component={MateriaForm} options={{ title: 'Nova Matéria' }} />
                {}

            </Stack.Navigator>
        </NavigationContainer>
    );
};

// ESTILIZAÇÃO DA HOME

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        padding: 20,
    },
    homeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 5,
    },
    homeSubtitle: {
        fontSize: 18,
        color: '#6c757d',
        marginBottom: 50,
    },
    homeButton: {
        flexDirection: 'row',
        backgroundColor: '#28a745',
        width: '80%',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 3,
    },
    materiaButton: {
        backgroundColor: '#6c757d',
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default App;

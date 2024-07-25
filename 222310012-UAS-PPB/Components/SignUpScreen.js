import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from './UserContext';
import { UserList } from './ConsData';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useUser();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const newUser = {
      id: (UserList.length + 1).toString(),
      username: email.split('@')[0],
      fullname: email.split('@')[0],
      email,
      password,
      profile: {
        name: email.split('@')[0],
        title: 'User',
        avatar: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
        contact: email,
        phone: 'Not Provided',
        facebook: 'Not Provided',
      },
    };

    UserList.push(newUser);
    setUser(newUser);

    Alert.alert('Success', 'You have successfully signed up!', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('HomeTabs');
          // Menampilkan data pengguna baru di cons data
          console.log('New User:', newUser);
          console.log('Updated UserList:', UserList);
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Password Confirm" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>or Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5078E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchText: {
    marginTop: 10,
    color: '#008000',
  },
});

export default SignUpScreen;

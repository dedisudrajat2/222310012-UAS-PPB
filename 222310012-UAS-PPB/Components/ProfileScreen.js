import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';  // Import the useUser hook

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useUser();  // Destructure user from the context

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Apakah yakin anda ingin keluar?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noUserText}>No user logged in</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: user.profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.profile.name}</Text>
        <Text style={styles.title}>{user.profile.title}</Text>
      </View>
      <View style={styles.info}>
        <InfoItem icon="mail" text={user.email} />
        <InfoItem icon="call" text={user.profile.phone} />
        <InfoItem icon="logo-instagram" text={user.profile.facebook} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function InfoItem({ icon, text }) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={24} color="black" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profile: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#4e8bed',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  info: {
    margin: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#4e8bed',
    padding: 15,
    borderRadius: 80,
    alignItems: 'center',
    margin: 100,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noUserText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';  // Import the useUser hook

const HomeScreen = ({ navigation, route }) => {
  const [sheets, setSheets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const { user } = useUser();  // Destructure user from the context

  useEffect(() => {
    if (user) {
      loadSheets();
    }
  }, [user]);

  useEffect(() => {
    if (route.params?.newSheet) {
      const newSheet = { ...route.params.newSheet, id: sheets.length + 1 };
      const updatedSheets = [newSheet, ...sheets]; // Add new sheet to the top
      setSheets(updatedSheets);
      saveSheets(updatedSheets);
    }

    if (route.params?.updatedSheet) {
      const updatedSheet = route.params.updatedSheet;
      const updatedSheets = sheets.map(sheet =>
        sheet.id === updatedSheet.id ? updatedSheet : sheet
      );
      setSheets(updatedSheets);
      saveSheets(updatedSheets);
    }
  }, [route.params?.newSheet, route.params?.updatedSheet]);

  const loadSheets = async () => {
    try {
      const savedSheets = await AsyncStorage.getItem(`sheets_${user.id}`);
      if (savedSheets) {
        setSheets(JSON.parse(savedSheets));
      }
    } catch (error) {
      console.error('Failed to load sheets:', error);
    }
  };

  const saveSheets = async (sheetsToSave) => {
    try {
      await AsyncStorage.setItem(`sheets_${user.id}`, JSON.stringify(sheetsToSave));
    } catch (error) {
      console.error('Failed to save sheets:', error);
    }
  };

  const deleteSheet = () => {
    const newSheets = sheets.filter(sheet => !selectedSheets.includes(sheet.id));
    setSheets(newSheets);
    saveSheets(newSheets);
    setSelectedSheets([]); // Clear selection after deletion
  };

  const confirmDelete = () => {
    if (selectedSheets.length === 0) {
      Alert.alert('No Selection', 'Please select at least one sheet to delete.');
      return;
    }
    Alert.alert(
      'Delete Sheets',
      'Are you sure you want to delete the selected sheets?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: deleteSheet,
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  };

  const toggleSelection = (id) => {
    if (selectedSheets.includes(id)) {
      setSelectedSheets(selectedSheets.filter(sheetId => sheetId !== id));
    } else {
      setSelectedSheets([...selectedSheets, id]);
    }
  };

  const renderSheet = ({ item }) => (
    <View style={styles.sheetContainer}>
      <TouchableOpacity
        style={styles.sheetContent}
        onPress={() => navigation.navigate('SheetDetailScreen', { sheet: item })}
      >
        <Text style={styles.sheetTitle}>{item.title}</Text>
        <Text style={styles.sheetDate}>{item.date}</Text>
      </TouchableOpacity>
      {editMode && (
        <Checkbox
          status={selectedSheets.includes(item.id) ? 'checked' : 'unchecked'}
          onPress={() => toggleSelection(item.id)}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EasySheet</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setEditMode(!editMode)}>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
          {editMode && selectedSheets.length > 0 && (
            <TouchableOpacity onPress={confirmDelete}>
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('SheetScreen')}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={sheets}
        renderItem={renderSheet}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5078E1',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sheetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  sheetContent: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 16,
  },
  sheetDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;

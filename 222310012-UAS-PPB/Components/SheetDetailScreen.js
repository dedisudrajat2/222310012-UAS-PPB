import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const SheetDetailScreen = ({ route, navigation }) => {
  const { sheet } = route.params;
  const [sheetTitle, setSheetTitle] = useState(sheet.title);
  const [sheetContent, setSheetContent] = useState(sheet.content);

  const saveChanges = () => {
    const updatedSheet = { ...sheet, title: sheetTitle, content: sheetContent };
    navigation.navigate('Home', { updatedSheet: updatedSheet });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          value={sheetTitle}
          onChangeText={setSheetTitle}
          placeholder="Enter sheet title..."
        />
        <Text style={styles.date}>{sheet.date}</Text>
        <TextInput
          style={styles.contentInput}
          multiline
          value={sheetContent}
          onChangeText={setSheetContent}
          placeholder="Type your note here..."
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#5078E1',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#5078E1',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SheetDetailScreen;

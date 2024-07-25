import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const SheetScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontStyle, setFontStyle] = useState('normal');
  const [textAlign, setTextAlign] = useState('left');

  const saveSheet = () => {
    if (title && content) {
      const currentDate = new Date().toLocaleDateString(); 
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: {
          newSheet: { title, content, date: currentDate }
        }
      });
    } else {
      Alert.alert('Error', 'Tolong isi JUDUL DAN ISI SHEET TERSEBUT !');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => setFontSize(prev => prev + 1)}>
          <FontAwesome5 name="font" size={24} color="black" style={{ transform: [{ scale: 1.2 }] }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontSize(prev => prev - 1)}>
          <FontAwesome5 name="font" size={24} color="black" style={{ transform: [{ scale: 0.8 }] }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsUnderlined(!isUnderlined)}>
          <FontAwesome name="underline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal')}>
          <FontAwesome name="italic" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTextAlign('left')}>
          <FontAwesome5 name="align-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTextAlign('center')}>
          <FontAwesome5 name="align-center" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTextAlign('right')}>
          <FontAwesome5 name="align-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, styles.titleInput]}
        placeholder="Sheet Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea, { fontSize, textDecorationLine: isUnderlined ? 'underline' : 'none', fontStyle, textAlign }]}
        placeholder="Sheet Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={saveSheet} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toolbarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  titleInput: {
    backgroundColor: '#f0f0f0',  
  },
  textArea: {
    height: 500,
    textAlignVertical: 'top',
    backgroundColor: '#f0f0f0',  
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5078E1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SheetScreen;

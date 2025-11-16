import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Search = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !text && styles.placeholder]}
        placeholder="Search for recipes..."
        placeholderTextColor="#cccccc"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  input: {
    height: 30,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 15,
  },
  placeholder: {
    fontStyle: 'italic',
  },
});

export default Search;

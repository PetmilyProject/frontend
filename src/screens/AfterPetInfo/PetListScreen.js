import { StyleSheet, Text, View } from 'react-native';

const PetListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetListScreen;
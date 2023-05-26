import { Pressable, StyleSheet, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { YELLOW } from '../colors';
import { CarePetRoutes } from '../navigations/routes';

//등록 수정 삭제 아이콘
const ComponentAMD = ({ navigation, onPress }) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <Entypo
            name="circle-with-plus"
            size={40}
            color={YELLOW.DEFAULT}
            onPress={() => {
              navigation.navigate(CarePetRoutes.ADD_SCHDULE);
            }}
          />
        </Pressable>
        <MaterialCommunityIcons
          name="pencil-circle"
          size={40}
          color={YELLOW.DEFAULT}
        />
        <MaterialCommunityIcons
          name="delete-circle"
          size={40}
          color={YELLOW.DEFAULT}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default ComponentAMD;

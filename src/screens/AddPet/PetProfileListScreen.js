import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import PetProfile from '../../components/AddPet/PetProfile';
import { useRoute } from '@react-navigation/native';
import { AddPetRoutes, CarePetRoutes } from '../../navigations/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WHITE, YELLOW } from '../../colors';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ViewListAlert from '../../components/ViewListAlert';

const PetProfileListScreen = ({ navigation, AddPress }) => {
  const route = useRoute();
  const [petProfiles, setPetProfiles] = useState([]);
  const [visible, setVisible] = useState(false);
  var petProfiles2 = [];
  const [select, setSelect] = useState(false);
  var inviter;
  var petData;
  var userName;
  var id;
  var cnt = 0;
  const [refreshing, setRefreshing] = useState(false);

  //petcare 이동
  const onPress = (petName, id) => {
    const params = [petName, id];
    navigation.navigate(CarePetRoutes.MAIN_CARE_PET, params);
  };

  //펫 계정 수정 삭제
  const handleLongPressed = () => {
    console.log('길게누르기');
  };

  const fetchData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const url = `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/pet/get-all/${email}`;

      const token = await AsyncStorage.getItem('token');

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;

      petData = userData;

      setPetProfiles(petData);
      petData.forEach(function (pet) {
        petProfiles2.push(pet);
        getImageUrl(pet.inviter, pet.id);
      });
    } catch (error) {
      console.log('Error fetching pet data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // AsyncStorage.setItem('userName', userName);
  }, []);

  const handleAddPress = () => {
    navigation.navigate(AddPetRoutes.REGISTER);
  };
  const handleInvitePress = () => {
    setVisible(true);
  };

  const getImageUrl = async (inviter, id) => {
    try {
      const email = await AsyncStorage.getItem('email');
      const url =
        `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/pet/${inviter}/downloadImage/${id}.jpg` +
        '?cache=' +
        Math.random();
      setPetProfiles((prevProfiles) =>
        prevProfiles.map((profile) => {
          if (profile.id === id) {
            return { ...profile, imgurl: url };
          }
          return profile;
        })
      );
    } catch (error) {
      console.log('Error fetching pet image:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchData();
    } catch (error) {
      console.log('Error refreshing pet data:', error);
    }

    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* 초대 모달 */}
      <ViewListAlert
        visible={visible}
        onClose={() => setVisible(false)}
        leftBtnColor={YELLOW.DEFAULT}
        title={'초대 요청'}
        leftText={'닫기'}
        comment={'초대를 수락하고 함께 펫을 관리해보세요'}
        subComment={'한 번 거절한 초대는 취소할 수 없습니다'}
        scrollViewName={'▶ 받은 초대'}
      />

      <View style={styles.container_list}>
        <Text style={styles.petHeaderText}>등록된 펫</Text>
        <View style={styles.rightAlignedIcons}>
          <TouchableOpacity onPress={handleAddPress} onRefresh={handleRefresh}>
            <Entypo name="circle-with-plus" size={40} color={YELLOW.DEFAULT} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInvitePress}>
            <Ionicons name="navigate-circle" size={43} color={YELLOW.DEFAULT} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {petProfiles.map((profile) =>
          // Add a check for null or undefined here
          profile && profile.petName ? (
            <PetProfile
              key={profile.id}
              name={profile.petName}
              age={profile.petAge}
              species={profile.detailInfo}
              gender={profile.gender}
              imgurl={profile.imgurl}
              handleLongPressed={handleLongPressed}
              onPress={() => onPress(profile.petName, profile.id)}
              select={select}
              id={profile.id}
            />
          ) : null
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
  },
  container_list: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: WHITE,
  },
  petHeaderText: {
    fontSize: 17,
  },
  scroll: {
    flex: 1,
  },
  rightAlignedIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PetProfileListScreen;

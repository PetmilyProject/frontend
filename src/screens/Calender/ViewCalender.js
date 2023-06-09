import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { WHITE, YELLOW } from '../../colors';
import { color } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

const ViewCalender = () => {
  var petData;
  const [myPets, setMyPets] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [petSchedules, setPetSchedules] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0); // 현재 선택된 펫 인덱스
  const [selectedDate, setSelectedDate] = useState();

  // 서버에서 일정 데이터를 가져오는 비동기 함수
  useEffect(() => {
    async function getPetData() {
      try {
        const email = await AsyncStorage.getItem('email');
        const url = `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/pet/get-all/${email}`;

        const response = await axios.get(url);
        petData = response.data;

        var petScheduleUrl = [];
        setMyPets([]);

        petData.map((pet) => {
          setMyPets((prevPets) => [...prevPets, pet.petName]);
          petScheduleUrl.push(
            `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/schedule/${email}/${pet.petName}`
          );
        });

        // 이전 내용이 들어가므로 그 부분을 삭제해줌
        petSchedules.splice(0, petSchedules.length);

        for (let i = 0; i < petScheduleUrl.length; i++) {
          const scheduleResponse = await axios.get(petScheduleUrl[i]);
          const scheduledata = scheduleResponse.data;

          petSchedules.push(scheduledata);
        }
        
        console.log(petSchedules);
        // petSchedules를 업데이트합니다.
        setPetSchedules([...petSchedules]);
      } catch (error) {
        console.log('펫 정보를 받지 못했습니다.');
      }
    }
    getPetData();
  }, []);

  const handlePreviousPet = () => {
    setCurrentPetIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return myPets.length - 1;
      }
    });
  };

  const handleNextPet = () => {
    setCurrentPetIndex((prevIndex) => {
      if (prevIndex < myPets.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.scheduleItem}>
      <Text style={styles.details}>{item.schedule}</Text>
      <Text style={styles.time}>{item.hm}</Text>
    </TouchableOpacity>
  );

  const renderRecurringItems = () => {
    return (
      <View>
        <FlatList
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.container2}
        />
      </View>
    );
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: 'blue',
    },
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Calendar 
          style={styles.calendar} 
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
        <View>
          {/*selectedDate && <Text>Selected Date : {selectedDate}</Text>*/}
          <Text
            style={{
              marginLeft: 10,
              marginTop: 20,
              marginBottom: 30,
              fontSize: 18,
              color: YELLOW.DEFAULT,
              fontWeight: '700',
            }}
          >
            예정된 일정
          </Text>
          <View style={styles.petNavigation}>
            <TouchableOpacity onPress={handlePreviousPet}>
              <Text style={styles.navigationText}>&lt;</Text>
            </TouchableOpacity>
            <Text style={styles.petName}>{myPets[currentPetIndex]}</Text>
            <TouchableOpacity onPress={handleNextPet}>
              <Text style={styles.navigationText}>&gt;</Text>
            </TouchableOpacity>
          </View>
          {petSchedules[currentPetIndex] &&
            petSchedules[currentPetIndex].map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.scheduleItem}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.details}>{item.schedule}</Text>
                <Text style={styles.time}>{item.hm}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {renderRecurringItems()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: WHITE,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
  },
  container2: {
    marginTop: 30,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  details: {
    fontSize: 18,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 120,
  },
  petNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  navigationText: {
    fontSize: 24,
    color: 'gray',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewCalender;
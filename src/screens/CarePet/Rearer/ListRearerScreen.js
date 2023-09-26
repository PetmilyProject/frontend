import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import InputText from '../../../components/InputText';
import { BLACK, GRAY, WHITE, YELLOW } from '../../../colors';
import Button2 from '../../../components/Button2';
import DangerAlert from '../../../components/DangerAlert';
import { Image } from 'react-native';
import { block } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

//양육자 프로필 생성
const renderRearer = (name) => {
  return (
    <View style={styles.container_profile}>
      <Image
        style={styles.dogImage}
        source={require('../../../assets/user.jpg')}
      />
      <Text style={styles.nicname}>{name}</Text>
    </View>
  );
};

const RearerItem = ({ name }) => (
  <View style={styles.rearerItem}>{renderRearer(name)}</View>
);

const ListRearerScreen = () => {
  const [visible, setVisible] = useState(false); //초대확인 모달 관리
  const [inviteName, setInviteName] = useState('');

  const rearerData = [
    { id: 1, name: '부양육자 1' },
    { id: 2, name: '부양육자 2' },
    { id: 3, name: '부양육자 3' },
    { id: 4, name: '부양육자 4' },
    { id: 5, name: '부양육자 5' },
    { id: 6, name: '부양육자 6' },
  ];

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DangerAlert
          visible={visible}
          title={`${inviteName}` + ' 님을' + '\n' + '초대하시겠습니까?'}
          comment={'한 번 요청한 초대는 취소할 수 없습니다.'}
          leftText={'취소'}
          rightText={'초대'}
          onClose={() => setVisible(false)}
          onRight={() => {}}
          leftBtnColor={GRAY.LIGHT}
          rightBtnColor={YELLOW.DEFAULT}
        />
        <View>
          <Text style={{ fontSize: 15, margin: 10, marginBottom: 5, flex: 1 }}>
            초대하기
          </Text>
        </View>
        <View style={styles.container_invite}>
          <View style={{ flex: 0.7 }}>
            <TextInput
              borderRadius={15}
              style={{
                marginLeft: 10,
                marginRight: 10,
                height: 40,
                borderWidth: 1,
                borderColor: 'gray',
              }}
              onChangeText={(text) => setInviteName(text)}
              keyboardType="email-address"
            />
          </View>
          <View
            borderRadius={15}
            style={{
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: YELLOW.DEFAULT,
              height: 40,
            }}
          >
            <TouchableOpacity
              style={{
                fontSize: 17,
                color: WHITE,
              }}
              onPress={() => {
                setVisible(true);
              }}
              paddingVertical={12}
            >
              <Text>초대</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container_rearer}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>등록된 양육자</Text>
          <ScrollView style={styles.scrollView}>
            <View>
              {/* 주양육자 표시 */}
              {renderRearer('주양육자')}
            </View>
            <View style={styles.rearerContainer}>
              {/* 부양육자 표시 */}
              {rearerData.map((item) => (
                <RearerItem key={item.id} name={item.name} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  container_invite: {
    flexDirection: 'row',
    marginBottom: 15,
    flex: 1,
  },
  container_rearer: {
    flex: 1,
  },
  rearerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  rearerItem: {
    width: '33.33%', // 3개씩 가로 배열을 위해 33.33%로 설정
    //padding: 5,
  },
  dogImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  container_profile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    //padding: 5,
  },
  nicname: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 17,
  },
});

export default ListRearerScreen;

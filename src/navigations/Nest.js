import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createContext, useState } from 'react';
import UserInfoScreen from '../screens/UserInfo/UserInfoScreen';
import FirstScreen from '../screens/FirstScreen';
import AddScheduleScreen from '../screens/CarePet/Schdule/AddScheduleScreen';
import PetRegisterScreen from '../screens/AddPet/PetRegisterScreen';
import {
  AddPetRoutes,
  AuthRoutes,
  CarePetRoutes,
  CommunityRoutes,
  UserInfoRoutes,
} from './routes';
import PetProfileListScreen from '../screens/AddPet/PetProfileListScreen';
import EmptySchduleScreen from '../screens/CarePet/Schdule/EmptySchduleScreen';
import MainCarePetScreen from '../screens/CarePet/MainCarePetScreen';
import AddphotoScreen from '../screens/CarePet/Photo/AddPhotoScreen';
import ListPhotoScreen from '../screens/CarePet/Photo/ListPhotoScreen';
import ViewCalender from '../screens/Calender/ViewCalender';
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import DetailPhotoScreen from '../screens/CarePet/Photo/DetailPhotoScreen';
import UserWithdrawalScreen from '../screens/UserInfo/UserWithdrawalScreen';
import ViewPetInfoScreen from '../screens/CarePet/ViewPetInfoScreen';
import CommunityPhotoScreen from '../screens/Community/CommunityPhotoScreen';
import CommunityDetailPhotoScreen from '../screens/Community/CommunityDetailPhotoScreen';
import ScheduleListScreen from '../screens/CarePet/Schdule/ScheduleListScreen';
import ScheduleModificationScreen from '../screens/CarePet/Schdule/ScheduleModificationScreen';
import AddCommunityScreen from '../screens/Community/AddCommunityScreen';
import DetailRearerScreen from '../screens/CarePet/Rearer/DetailRearerScreen';
import ListRearerScreen from '../screens/CarePet/Rearer/ListRearerScreen';
import UserInfoEditScreen from '../screens/UserInfo/UserInfoEditScreen';
import CommunityUpdateScreen from '../screens/Community/CommunityUpdateScreen';
import UpdatePhotoScreen from '../screens/CarePet/Photo/UpdatePhotoScreen';
import { YELLOW } from '../colors';

const TabStack = createBottomTabNavigator();
const AddPetStack = createStackNavigator();
const SignInStack = createStackNavigator();
const UserInfoStack = createStackNavigator();
const PhotoStack = createStackNavigator();

export const AuthContext = createContext();
export const PetContext = createContext();

//로그인 로그아웃
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
// 메인-(일정,사진첩,양육자)
const AddPetStackScreen = () => {
  return (
    <AddPetStack.Navigator>
      {/* 펫 목록 */}
      <AddPetStack.Screen
        name={AddPetRoutes.LIST}
        component={PetProfileListScreen}
        options={{ title: '메인' }}
      />
      {/* 펫 추가 */}
      <AddPetStack.Screen
        name={AddPetRoutes.REGISTER}
        component={PetRegisterScreen}
        options={{ title: '펫정보' }}
      />
      {/* Care Pet 입장 */}
      <AddPetStack.Screen
        name={CarePetRoutes.MAIN_CARE_PET}
        component={MainCarePetScreen}
        options={{ headerShown: false }}
      />
      {/* Care Pet - 빈 일정 */}
      <AddPetStack.Screen
        name={CarePetRoutes.EMPTY_SCHDULE}
        component={EmptySchduleScreen}
        options={{ headerShown: false }}
      />
      <AddPetStack.Screen
        name={CarePetRoutes.ADD_SCHDULE}
        component={AddScheduleScreen}
        options={{ title: '일정등록' }}
        // options={{ headerShown: false }}
      />
      <AddPetStack.Screen name="PetMain" component={UserInfoScreen} />
      {/* 펫정보 */}
      <AddPetStack.Screen
        name={CarePetRoutes.VIEW_PET}
        component={ViewPetInfoScreen}
        options={{ title: '펫정보' }}
      />
      {/* 스케줄 리스트 */}
      <AddPetStack.Screen
        name={'ScheduleListScreen'}
        component={ScheduleListScreen}
        options={{ headerShown: false }}
      />
      {/*스케줄 수정 및 삭제 */}
      <AddPetStack.Screen
        name={CarePetRoutes.VIEW_ScheduleModification}
        component={ScheduleModificationScreen}
        options={{ title: '일정수정' }}
      />
      {/* 사진 목록 */}
      <AddPetStack.Screen
        name={'ListPhotoScreen'}
        component={ListPhotoScreen}
        options={{ headerShown: false }}
      />
      {/* 사진 등록 및 상세 */}
      <AddPetStack.Screen
        name={'AddPhotoScreen'}
        component={AddphotoScreen}
        options={{ title: '사진등록' }}
      />

      <AddPetStack.Screen
        name={CarePetRoutes.DETAIL_PHOTO}
        component={DetailPhotoScreen}
        options={{ title: '사진 상세' }}
      />
      {/* 사진 수정 */}
      <AddPetStack.Screen
        name={CarePetRoutes.UPDATE_PHOTO}
        component={UpdatePhotoScreen}
        options={{ title: '사진 수정' }}
      />
      {/* 양육자 */}
      <AddPetStack.Screen
        name={CarePetRoutes.DETAIL_REARER}
        component={DetailRearerScreen}
        options={{ title: '양육자 상세' }}
      />
      <AddPetStack.Screen
        name={CarePetRoutes.LIST_REARER}
        component={ListRearerScreen}
        options={{ headerShown: false }}
      />
    </AddPetStack.Navigator>
  );
};

//커뮤니티
const PhotoStackScreen = () => {
  return (
    <PhotoStack.Navigator>
      {/* Care Pet - 사진첩 */}
      {/* <PhotoStack.Screen
        name={CarePetRoutes.EMPTY_PHOTO}
        component={EmptyPhotoSceen}
        options={{ headerShown: false }}
      /> */}
      <PhotoStack.Screen
        name={CommunityRoutes.PHOTO_COMMUNITY}
        component={CommunityPhotoScreen}
        options={{ headerShown: false }}
      />
      <PhotoStack.Screen
        name={CommunityRoutes.DETAIL_COMMUNITY}
        component={CommunityDetailPhotoScreen}
        options={{ headerShown: false }}
      />
      <PhotoStack.Screen
        name={CommunityRoutes.ADD_COMMUNITY}
        component={AddCommunityScreen}
        options={{ headerShown: false }}
      />
      <PhotoStack.Screen
        name={CommunityRoutes.UPDATE_COMMUNITY}
        component={CommunityUpdateScreen}
        options={{ headerShown: false }}
      />
    </PhotoStack.Navigator>
  );
};
// 내정보
const UserInfoStackScreen = () => {
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen
        name={UserInfoRoutes.MAIN_USER}
        component={UserInfoScreen}
        options={{ title: '내 정보' }}
      />
      <UserInfoStack.Screen
        name={UserInfoRoutes.WITHDRAWAL}
        component={UserWithdrawalScreen}
        options={{ title: '계정삭제' }}
      />
      <UserInfoStack.Screen
        name={UserInfoRoutes.USER_EDIT}
        component={UserInfoEditScreen}
        options={{ title: '회원 정보 수정' }}
      />
    </UserInfoStack.Navigator>
  );
};

const TabStackScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authContext = {
    signIn: () => setIsSignedIn(true),
    signOut: () => setIsSignedIn(false),
  };

  if (!isSignedIn) {
    return (
      <AuthContext.Provider value={authContext}>
        <SignInStack.Navigator>
          <SignInStack.Screen
            name="First"
            component={FirstScreen}
            options={{ headerShown: false }}
          />
          <SignInStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: '로그인',
              headerBackTitle: ' ',
            }}
          />
          <SignInStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: '회원가입', headerBackTitle: ' ' }}
          />
        </SignInStack.Navigator>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <TabStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === '캘린더') {
              iconName = 'calendar';
            } else if (route.name === '메인') {
              iconName = 'home';
            } else if (route.name === '커뮤니티') {
              iconName = 'chatbubbles';
            } else if (route.name === '내정보') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fbbf24', // 여기에 활성 탭의 아이콘 색상을 설정합니다.
        }}
      >
        <TabStack.Screen
          name="메인"
          component={AddPetStackScreen}
          options={{ headerShown: false }}
        />
        <TabStack.Screen name="캘린더" component={ViewCalender} />

        <TabStack.Screen
          name="커뮤니티"
          component={PhotoStackScreen}
          //options={{ headerShown: false }}
        />

        <TabStack.Screen
          name="내정보"
          component={UserInfoStackScreen}
          options={{ headerShown: false }}
        />
      </TabStack.Navigator>
    </AuthContext.Provider>
  );
};

export default TabStackScreen;

// // limseohyeon 0726

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   TouchableOpacity,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // function ScheduleList(petName) {
// //   const [responseData, setResponseData] = useState([]);

// //   // 서버에서 일정 데이터를 가져오는 비동기 함수
// //   useEffect(() => {
// //     AsyncStorage.getItem('schedule')
// //       .then((inviter) => {
// //         AsyncStorage.getItem('token')
// //           .then((token) => {
// //             axios
// //               .get(
// //                 `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/schedule/${inviter}/${petName}`,
// //                 {
// //                   headers: {
// //                     Authorization: `Bearer ${token}`,
// //                   },
// //                 }
// //               )
// //               .then((response) => {
// //                 // console.log(response.data[1].schedule);
// //                 setResponseData(response.data);
// //               })
// //               .catch((error) => {
// //                 console.error(error);
// //               });
// //           })
// //           .catch((error) => {
// //             console.error(error);
// //           });
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   }, []);

// //   const renderItem = ({ item }) => (
// //     <TouchableOpacity style={styles.scheduleItem}>
// //       <Text style={styles.details}>{item.schedule}</Text>
// //       <Text style={styles.time}>{item.hm}</Text>
// //       <Text style={styles.details}>{item.inviter}</Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View>
// //       <FlatList
// //         data={responseData}
// //         renderItem={renderItem}
// //         keyExtractor={(item) => item.id.toString()}
// //         style={styles.container}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     marginTop: 30,
// //   },
// //   scheduleItem: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     borderRadius: 20,
// //     backgroundColor: '#f5f5f5',
// //     padding: 20,
// //   },
// //   time: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   details: {
// //     fontSize: 18,
// //   },
// //   assignee: {
// //     fontSize: 16,
// //     color: '#777',
// //   },
// // });

// // export default ScheduleList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused } from '@react-navigation/native';

// function ScheduleList({ petName }) {
//   const [responseData, setResponseData] = useState([]);
//   const isFocused = useIsFocused();

//   // 서버에서 일정 데이터를 가져오는 비동기 함수
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const inviter = await AsyncStorage.getItem('schedule');
//         const token = await AsyncStorage.getItem('token');

//         const response = await axios.get(
//           `http://ec2-43-200-8-47.ap-northeast-2.compute.amazonaws.com:8080/schedule/${inviter}/${petName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setResponseData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [isFocused, petName]);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.scheduleItem}>
//       <Text style={styles.details}>{item.schedule}</Text>
//       <Text style={styles.time}>{item.hm}</Text>
//       <Text style={styles.details}>{item.inviter}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <FlatList
//         data={responseData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         style={styles.container}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//   },
//   scheduleItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius: 20,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   time: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   details: {
//     fontSize: 18,
//   },
//   assignee: {
//     fontSize: 16,
//     color: '#777',
//   },
// });

// export default ScheduleList;

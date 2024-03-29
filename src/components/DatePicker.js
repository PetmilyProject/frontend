// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import DatePicker from 'react-native-datepicker';

// const MyDatePicker = () => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };

//   const handlePress = () => {
//     // 이 부분에 선택된 날짜를 사용하는 로직을 추가할 수 있습니다.
//     console.log('Selected Date:', selectedDate);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>날짜 선택:</Text>
//       <DatePicker
//         style={styles.datePicker}
//         date={selectedDate}
//         mode="date"
//         format="YYYY-MM-DD"
//         minDate="2020-01-01"
//         maxDate="2025-12-31"
//         confirmBtnText="확인"
//         cancelBtnText="취소"
//         customStyles={{
//           dateInput: {
//             borderWidth: 0,
//           },
//           dateText: {
//             fontSize: 16,
//           },
//           dateIcon: {
//             display: 'none',
//           },
//         }}
//         onDateChange={handleDateChange}
//       />
//       <Button title="선택" onPress={handlePress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   datePicker: {
//     width: 200,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
// });

// export default MyDatePicker;

import { useState, useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDateObj, setSelectedDateObj] = useState(null); // New state variable for selected date in Date object format

  useEffect(() => {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth() + 1);
    const date = String(today.getDate());
    const formattedDate = `${year}년 ${month}월 ${date}일`;

    // If selectedDate is not set (null or undefined), set it to the current date
    if (!selectedDate) {
      onDateChange(formattedDate);
    }

    setCurrentDate(formattedDate);
  }, [selectedDate, onDateChange]);

  const [dateVisible, setDateVisible] = useState(false);

  const showDatePicker = () => {
    setDateVisible(true);
  };

  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const handleDatePicker = (pickerDate) => {
    setDateVisible(false);
    const year = String(pickerDate.getFullYear());
    const month = String(pickerDate.getMonth() + 1);
    const date = String(pickerDate.getDate());
    const formattedDate = `${year}년 ${month}월 ${date}일`;

    setCurrentDate(formattedDate);
    setSelectedDateObj(pickerDate); // Store the selected date as a Date object
    onDateChange(formattedDate);
  };

  return (
    <Pressable onPress={showDatePicker}>
      <Text>{selectedDate || currentDate}</Text>
      <DateTimePickerModal
        isVisible={dateVisible}
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleDatePicker}
      />
    </Pressable>
  );
};

export default DatePicker;
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import StyledButton from "../StyledButton"

interface DateTimePickerCompProps {
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
}

const DateTimePickerComp: React.FC<DateTimePickerCompProps> = ({
  setStartDate,
  setEndDate,
}) => {
  const [startDate, setLocalStartDate] = useState(new Date())
  const [endDate, setLocalEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  )
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const onChangeStart = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate
    setLocalStartDate(currentDate)
    setStartDate(currentDate)
  }

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate
    setLocalEndDate(currentDate)
    setEndDate(currentDate)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateLabel}>From:</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>{startDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <Modal visible={showStartPicker} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateLabel}>Start of booking</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode="datetime"
              display="default"
              onChange={onChangeStart}
            />
            <View style={styles.buttonContainer}>
              <StyledButton
                title="Confirm"
                onPress={() => setShowStartPicker(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.dateLabel}>To:</Text>
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>{endDate.toLocaleString()}</Text>
      </TouchableOpacity>

      <Modal visible={showEndPicker} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.dateLabel}>End of booking</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode="datetime"
              display="default"
              onChange={onChangeEnd}
            />
            <View style={styles.buttonContainer}>
              <StyledButton
                title="Confirm"
                onPress={() => setShowEndPicker(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 18,
    marginVertical: 4,
    fontWeight: "bold",
  },
  datePicker: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 0,
  },
  dateText: {
    fontSize: 18,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 16,
    alignSelf: "stretch",
  },
})

export default DateTimePickerComp

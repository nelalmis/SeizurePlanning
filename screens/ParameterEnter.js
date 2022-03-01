import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Input, Icon, useTheme, Text } from "react-native-elements";
import {
  dateDiffInMinutes,
  doFormatDate,
  minuteToHourAndMinute,
} from "../helper/helper";
import {
  RadioButton,
  TextInput,
  Switch,
} from "react-native-paper";

const ParameterEnter = (props) => {
  const dateAfterOneDay = new Date();
  dateAfterOneDay.setDate(dateAfterOneDay.getDate() + 1);
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [endDate, setEndDate] = useState(dateAfterOneDay);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [enterPersonName, setEnterPersonName] = useState(false);
  const [totalGuardHour, setTotalGuardHour] = useState(0);
  const [totalGuardSecond, setTotalGuardMinute] = useState(0);
  const [guardTimeOption, setGuardTimeOption] = useState("1");
  const [personelNameList, setPersonelNameList] = useState([]);
  let staticPersonelNameList = [];
  const [openGuardNumber, setOpenGuardNumber] = useState(false);
  const [guardCount, setGuardCount] = useState("1");
  const [openConversionNumber, setOpenConversionNumber] =useState(false);
  const [conversionNumber,setConversionNumber] = useState("1");
  // const [openGuardPlaceCount, setOpenGuardPlaceCount] = useState(false);
  const [guardPlaceName, setGuardPlaceName] = useState("Nöbet Yeri-1");
  const [showLoadingInButton, setShowLoadingInButton] = useState(false);
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
  ]);

  const onToggleSwitch = () => {
    setEnterPersonName(!enterPersonName);
    resetPersonelNameList();
  };
  const onStartDateChange = (event, date) => {
    setShowStartDate(false);
    if (date) {
      setStartDate(date);
      setShowStartTime(true);
    }
  };
  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTime(false);
    if (selectedTime) {
      let newDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setStartDate(newDate);
    }
  };
  const onEndDateChange = (event, date) => {
    setShowEndDate(false);
    if (date) {
      setEndDate(date);
      setShowEndTime(true);
    }
  };
  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTime(false);
    if (selectedTime) {
      let newDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setEndDate(newDate);
    }
  };
  const renderPersonNameInputs = () => {
    let array = [];
    for (let index = 0; index < guardCount; index++) {
      let placeholder = (index + 1).toString() + ". Personelin adı soyadı";
      let key = "personName_" + (index + 1).toString();
      array.push(
        <TextInput
          style={{ width: "100%" }}
          key={key}
          label={placeholder}
          autoComplete={true}
          mode={"outlined"}
          error={personelNameList[index] ? false : true}
          testID="{index}"
          value={personelNameList[index]}
          placeholder={placeholder}
          onChangeText={(text) => onChangePersonName(index, text)}
        />
      );
    }
    return array;
  };
  const onChangePersonName = (index, value) => {
    staticPersonelNameList = Object.assign([], personelNameList);
    staticPersonelNameList[index] = value;
    setPersonelNameList(staticPersonelNameList);
  };

  const onPressCalculate = () => {
    setShowLoadingInButton(true);
    let isValid = true;
    let errorMessage = "";
    if (!guardCount) {
      return;
    }

    if (enterPersonName) {
      if (personelNameList.length == 0) {
        isValid = false;
        errorMessage = "Personel ismi boş olamaz!";
      }
      personelNameList.map((u, index) => {
        u = u.toString().trim();
        if (
          personelNameList.some((x, indexSome) => x === u && index != indexSome)
        ) {
          // Aynı isim olamaz.
          isValid = false;
          errorMessage = "Aynı isim olamaz!";
        }
      });
      if (personelNameList.some((u) => !u)) {
        errorMessage = "Personel ismi boş olamaz!";
        isValid = false;
      }
    }
    if (!isValid) {
      alert(errorMessage);
      setShowLoadingInButton(false);
      return;
    }
    let startDateClone = new Date(startDate.getTime());
    let currentTotalGuardTimeInSecond = 0;
    if (guardTimeOption === "2" || guardTimeOption === "3") {
      currentTotalGuardTimeInSecond =
        Number(totalGuardHour) * 60 + Number(totalGuardSecond);
      if (currentTotalGuardTimeInSecond <= 0) {
        setShowLoadingInButton(false);
        errorMessage = "Nöbet süresi boş olamaz.";
        alert(errorMessage);
        return;
      }
    } else if (guardTimeOption === "1") {
      if (startDate >= endDate) {
        errorMessage =
          "Başlangıç tarihi, bitiş tarihinden daha büyük ve eşit olamaz.";
        setShowLoadingInButton(false);
        alert(errorMessage);
        return;
      }
      currentTotalGuardTimeInSecond = dateDiffInMinutes(startDate, endDate);
    }
    let guardTimePerPerson =
      guardTimeOption === "1"
        ? Math.floor(Number(currentTotalGuardTimeInSecond) / Number(guardCount))
        : currentTotalGuardTimeInSecond;

    let seizurePlan = [];
    for (let j = 0; j < conversionNumber; j++) {
      for (let index = 0; index < guardCount; index++) {
        let newSeizure = {
          name: enterPersonName
            ? personelNameList[index]
            : "Personel - " + (index + 1).toString(),
          startTime: new Date(startDateClone.getTime()),
          guardTimePerPerson: guardTimePerPerson,
          endTime: null,
          guardPlaceName: guardPlaceName,
          strStartTime: "",
          strEndTime: "",
          guardTimeInMinutes: 0,
          sortOrder:index + 1
        };
        startDateClone.setMinutes(
          startDateClone.getMinutes() + guardTimePerPerson
        );
        newSeizure.endTime = new Date(startDateClone.getTime());
        newSeizure.strStartTime = doFormatDate(newSeizure.startTime);
        newSeizure.strEndTime = doFormatDate(newSeizure.endTime);
        newSeizure.guardTimeInMinutes = dateDiffInMinutes(
          newSeizure.startTime,
          newSeizure.endTime
        );
        seizurePlan.push(Object.assign({}, newSeizure));
      }
    }
    let data = {
      seizurePlan: seizurePlan,
      guardCount: guardCount,
      guardTimePerPerson: guardTimePerPerson,
      startDate: startDate,
      endDate: endDate,
      personelNameList: personelNameList,
      guardPlaceName: guardPlaceName,
    };
    props.navigation.navigate("Sonuç", data);
    setShowLoadingInButton(false);
  };
  const resetPersonelNameList = () => {
    if (enterPersonName) {
      let newArray = [];
      for (let index = 0; index < Number(guardCount); index++) {
        newArray.push(
          personelNameList.length > index ? personelNameList[index] : ""
        );
      }
      staticPersonelNameList = newArray;
      setPersonelNameList(Object.assign([], staticPersonelNameList));
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.element}>
          <Text h4 h4Style={{ fontSize: 16, color: theme?.colors?.primary }}>
            Nöbet Başlangıç Zamanı :{" "}
          </Text>
          <TouchableOpacity onPress={() => setShowStartDate(true)}>
            <Input
              value={startDate ? doFormatDate(startDate) : ""}
              disabled={true}
              pointerEvents={"none"}
              rightIcon={
                <Icon
                  name="calendar"
                  type="font-awesome"
                  size={24}
                  color="black"
                  onPress={() => setShowStartDate(true)}
                ></Icon>
              }
            />
          </TouchableOpacity>
          {showStartDate && (
            <DateTimePicker
              key={"startDateDate"}
              date={startDate ? startDate : new Date()}
              value={startDate ? startDate : new Date()}
              mode={"date"}
              is24Hour={true}
              display={"default"}
              onChange={onStartDateChange}
            />
          )}
          {showStartTime && (
            <DateTimePicker
              key={"startDateTime"}
              date={startDate ? startDate : new Date()}
              value={startDate ? startDate : new Date()}
              mode={"time"}
              is24Hour={true}
              display={"default"}
              onChange={onStartTimeChange}
              minuteInterval={5}
            />
          )}
        </View>
        <View style={styles.element}>
          <Text h4 h4Style={{ fontSize: 16, color: theme?.colors?.primary }}>
            Nöbet Hesaplama Şekli :{" "}
          </Text>
          <RadioButton.Group
            onValueChange={(value) => setGuardTimeOption(value)}
            value={guardTimeOption}
          >
            <RadioButton.Item
              color="black"
              value="1"
              label="Bitiş zamanı girerek"
            />
            <RadioButton.Item
              color="black"
              value="2"
              label="Toplam nöbet süresi"
            />
            <RadioButton.Item
              color="black"
              value="3"
              label="Bir kişi için nöbet süresi"
            />
          </RadioButton.Group>
        </View>
        {guardTimeOption === "1" && (
          <View style={styles.element}>
            <Text h4 h4Style={{ fontSize: 16, color: theme?.colors?.primary }}>
              Nöbet Bitiş Zamanı :{" "}
            </Text>
            <TouchableOpacity onPress={() => setShowEndDate(true)}>
              <Input
                value={endDate ? doFormatDate(endDate) : ""}
                disabled={true}
                pointerEvents={"none"}
                rightIcon={
                  <Icon
                    name="calendar"
                    type="font-awesome"
                    size={24}
                    color="black"
                    onPress={() => setShowEndDate(true)}
                  ></Icon>
                }
              />
            </TouchableOpacity>
            {showEndDate && (
              <DateTimePicker
                key={"endDateDate"}
                minimumDate={startDate}
                date={endDate ? endDate : new Date()}
                value={endDate ? endDate : new Date()}
                mode={"date"}
                is24Hour={true}
                display={"default"}
                onChange={onEndDateChange}
              />
            )}
            {showEndTime && (
              <DateTimePicker
                key={"endDateTime"}
                date={endDate ? endDate : new Date()}
                value={endDate ? endDate : new Date()}
                mode={"time"}
                is24Hour={true}
                display={"default"}
                onChange={onEndTimeChange}
                minuteInterval={5}
              />
            )}
          </View>
        )}
        {(guardTimeOption === "2" || guardTimeOption === "3") && (
          <View style={styles.element}>
            <Text h4 h4Style={{ fontSize: 16, color: theme?.colors?.primary }}>
              {guardTimeOption === "2"
                ? "Toplam Nöbet Süresi :"
                : "Nöbet Süresi :"}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "nowrap",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ minWidth: 60, width: 60 }}
                  label={"Sa"}
                  value={totalGuardHour}
                  onChangeText={setTotalGuardHour}
                  keyboardType="numeric"
                  placeholder="sa"
                  maxLength={2}
                  mode="outlined"
                />
                <Text style={{ textAlign: "left", width: 11, maxWidth: 10 }}>
                  {" "}
                  :{" "}
                </Text>
                <TextInput
                  style={{ minWidth: 60, width: 60 }}
                  label={"Dk"}
                  value={totalGuardSecond}
                  onChangeText={setTotalGuardMinute}
                  onBlur={(args) => {
                    let tmpObj = minuteToHourAndMinute(
                      Number(totalGuardHour * 60) + Number(totalGuardSecond)
                    );
                    setTotalGuardHour(tmpObj.hour);
                    setTotalGuardMinute(tmpObj.minute);
                  }}
                  keyboardType="numeric"
                  placeholder="dk"
                  maxLength={2}
                  mode="outlined"
                />
              </View>
            </View>
          </View>
        )}
        {
          guardTimeOption ==="3" &&(
          <View style ={styles.element}>
            <Text h4 h4Style={{ fontSize: 15, color: theme?.colors?.primary }}>
            Dönüşüm Sayısı :{" "}
          </Text>
          <DropDownPicker
            open={openConversionNumber}
            value={conversionNumber}
            items={items.filter(u=> Number (u.value) <= 5)}
            setOpen={setOpenConversionNumber}
            setValue={setConversionNumber}
            setItems={setItems}
            dropDownDirection={"AUTO"}
            listMode={"MODAL"}
            language={"TR"}
          />
          </View>
          )}
        <View style={styles.element}>
          <TextInput
            selectionColor="#f1f8ff"
            label={"Nöbet Yeri İsmi"}
            autoComplete={true}
            mode={"outlined"}
            value={guardPlaceName}
            placeholder={"Nöbet yeri ismi"}
            onChangeText={setGuardPlaceName}
            outlineColor={theme?.colors?.primary}
            activeOutlineColor={theme.colors.primary}
          />
        </View>
        <View style={styles.element}>
          <Text h4 h4Style={{ fontSize: 15, color: theme?.colors?.primary }}>
            Nöbet Tutacak Personel Sayısı :{" "}
          </Text>
          <DropDownPicker
            open={openGuardNumber}
            value={guardCount}
            items={items}
            setOpen={setOpenGuardNumber}
            setValue={setGuardCount}
            setItems={setItems}
            dropDownDirection={"AUTO"}
            listMode={"MODAL"}
            language={"TR"}
            onChangeValue={(value) => {
              resetPersonelNameList();
            }}
          />
        </View>
        <View style={styles.element}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontStyle: "normal",
                textAlignVertical: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: theme?.colors?.primary,
              }}
            >
              Personel isimleri girilecek mi?
            </Text>
            <Switch
              color="red"
              value={enterPersonName}
              onValueChange={onToggleSwitch}
            />
          </View>
        </View>
        {enterPersonName && renderPersonNameInputs()}

        <View style={styles.element}>
          <Button
            title="Hesapla"
            buttonStyle={{ backgroundColor: theme.colors.primary }}
            containerStyle={{
              height: 50,
              width: "100%",
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              marginHorizontal: 10,
              fontSize: 20,
            }}
            loading={showLoadingInButton}
            iconPosition={"right"}
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 25,
              color: "white",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
            onPress={() => onPressCalculate()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 2,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  element: {
    width: "100%",
    marginTop: 10,
  },
});

export default ParameterEnter;

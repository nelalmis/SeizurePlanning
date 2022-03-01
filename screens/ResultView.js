import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, ScrollView,Share } from "react-native";
import { doFormatDate, minuteToHourAndMinute } from "../helper/helper";
import ResultTable from "../components/ResultTable";
import { Card, TextInput, IconButton } from "react-native-paper";
import { useTheme } from "react-native-elements";
import ViewShot, { captureRef } from "react-native-view-shot";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const ResultView = (props, seizurePlan) => {
  
  const state = {
    data: props.navigation.state.params,
  };
  const { theme } = useTheme();
  const [description, setDescription] = useState("");
  const strStartTime = doFormatDate(state.data.startDate);
  const strEndTime = doFormatDate(state.data.endDate);
  const placeName = state.data.guardPlaceName;
  const minuteToHourAndMinuteObj = minuteToHourAndMinute(
    state.data.guardTimePerPerson
  );

  const onShare = async (uri) => {
    try {
      console.log(uri);
      const result = await Share.share({
        url: uri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    // console.log("");
    // console.log("");
    // console.log("-------------");
    // console.log("Event: ", event);
    // console.log("GestureState: ", gestureState);
    // console.log("ZoomableEventObject: ", zoomableViewEventObject);
    // console.log("");
    // console.log(
    //   `Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`
    // );
  };

  return (
    <ScrollView maximumZoomScale={5} minimumZoomScale={1} >
        <ViewShot
          options={{ format: "jpg", quality: 0.9 } }
          // captureMode="mount"
          // onCapture={(uri)=>onShare(uri)}
        >
            <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.7}
        zoomStep={0.5}
        // initialZoom={1}
        captureEvent={true}
        bindToBorders={true}
        // zoomEnabled={true}
        onZoomAfter={logOutZoomState}
        // style={{
        //   padding: 10,
        //   backgroundColor: "red",
        // }}
        
      >
          <Card>
            <Card.Title
              title={placeName}
              // right={(props) => (
              //   <IconButton
              //     {...props}
              //     icon="more"
              //     color="blue"
              //   />
              // )}
            />
            <Card.Content>
              <View style={styles.element}>
                <Text style={styles.label}>Başlangıç Zamanı : </Text>
                <Text>{strStartTime}</Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.label}>Bitiş Zamanı : </Text>
                <Text>{strEndTime}</Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.label}>Personel Sayısı : </Text>
                <Text>{state.data.guardCount.toString()}</Text>
              </View>
              <View style={styles.element}>
                <Text style={styles.label}>
                  Personel Başına Düşen Nöbet Süresi :
                </Text>
                <Text>
                  {" "}
                  {state.data.guardTimePerPerson} dak. /{" "}
                  {/* {parseInt(minuteToHourAndMinuteObj.hour)} sa{" "}
                  {parseInt(minuteToHourAndMinuteObj.minute)} dak. */}
                </Text>
              </View>
              <View>
                <ResultTable
                  placeName={placeName}
                  seizurePlan={state.data.seizurePlan}
                ></ResultTable>
              </View>
              <View style={styles.element}>
                <TextInput
                  style={{ width: "100%" }}
                  selectionColor="#f1f8ff"
                  label={"Açıklama"}
                  mode={"outlined"}
                  value={description}
                  placeholder={"Nöbet yeri ismi"}
                  onChangeText={setDescription}
                  outlineColor={theme?.colors?.primary}
                  activeOutlineColor={theme.colors.primary}
                  multiline={true}
                  numberOfLines={5}
                />
              </View>
            </Card.Content>
          </Card>
          </ReactNativeZoomableView>
        </ViewShot>
    
    </ScrollView>
  );
};

export default ResultView;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 50 },
  text: { textAlign: "center" },
  label: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  element: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

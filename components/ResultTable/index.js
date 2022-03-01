import React from "react";
import { StyleSheet, View, TouchableHighlight ,FlatList} from "react-native";
import { Input } from "react-native-elements";
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import SeizureInfo from "../SeizureInfo";

const ResultTable = ({ placeName, seizurePlan }) => {
  if (!seizurePlan) seizurePlan = [];
  const elementButton = (value) => (
    <Input containerStyle={styles.input} scrollEnabled={true}></Input>
  );
  seizurePlan.map(u=>{
    u["Personel"] = u.name;
    u["Başlangıç Tarihi"] = u.strStartTime;
    u["Bitiş Tarihi"] = u.strEndTime;
  })
  return (
    <View style={styles.container}>
       <DataTable
            data={seizurePlan} // list of objects
            colNames={['Personel','Başlangıç Tarihi', 'Bitiş Tarihi']} //List of Strings
            // colSettings={[{ name: 'name', type: COL_TYPES.STRING,label:'Baş' }]}
            noOfPages={15} //number
            backgroundColor={'white'} //Table Background Color
        />
         <View>
          <FlatList
             data={seizurePlan}
             renderItem={({item,index,seperators}) =>(
              <TouchableHighlight
              key={item.sortOrder}
              // onPress={() => this._onPress(item)}
              // onShowUnderlay={seperators.highlight}
              // onHideUnderlay={seperators.unhighlight}
              >
              <SeizureInfo personName={item.name} sortOrder={item.sortOrder} startTime={item.strStartTime} endTime={item.strEndTime} />
            </TouchableHighlight>
             )}
          >

          </FlatList>
        </View>
        
    </View>
  );
};

export default ResultTable;

const styles = StyleSheet.create({
  container: {padding: 0, alignContent:"flex-start",width:"100%", backgroundColor: "#fff" },
  head: { height: 50, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 2, backgroundColor: "#f6f8fa" },
  row: { height: 50 },
  text: { textAlign: "center" },
  label: {
    fontWeight: "bold",
  },
  element: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  input: {
    width:"100%",
    height:"100%",
    marginTop:15,
    marginLeft: 0,
    borderRadius: 2,
  },
});

import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons'
const SeizureInfo = ({sortOrder, personName, startTime, endTime})=>  {
    return (
        <View style={styles.element}>
             <View style={{
                 flexDirection:"column",
                 alignContent:"center",
                 justifyContent:"center",
                 borderRightWidth:2,
                 borderRightColor:"#C8C8C8",
                //  borderRadius:2,
                 padding:5,
                 borderStyle:"dashed"
             }}>
             <FontAwesome5 
            name="grip-vertical" size={25} color="black"
             />
             </View>
             <Text style={styles.text}>{personName}</Text>   
             <Text style={styles.text}>{startTime}</Text>   
             <Text style={styles.text}>{endTime}</Text>   
        </View>
    );
}

export default SeizureInfo;

const styles = StyleSheet.create({
element:{
    height:50,
    flexDirection:"row",
    alignContent:"space-around",
    justifyContent:"flex-start",
     borderBottomColor:"#C8C8C8",
     borderBottomWidth:1,
     borderRadius:10
    },
    
text:{
    width:100,
    maxWidth:100,
    marginHorizontal:5,
    textAlignVertical:"center"
}
});
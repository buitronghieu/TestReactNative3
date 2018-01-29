/**
 * Created by HungDang on 8/26/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
import MapView from 'react-native-maps';
class DetailWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       return(
           <MapView.Callout >
               <View style = {styles.window}>
                   <Text>{this.props.onlineDetail.address}</Text>
               </View>
           </MapView.Callout>
           );
       }
}
const styles = StyleSheet.create({
    window: {
        padding:2,
        width:300,
        height:40,
    }
});
module.exports = DetailWindow;
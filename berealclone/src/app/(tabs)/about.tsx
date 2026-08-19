import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import {Image} from "expo-image";

export default function About() {
  return (
    <View style={styles.container}>
      <Image style = {styles.image} 
      source={{uri:"https://gongsound.co.uk/wp-content/uploads/2023/03/220313-5656.jpg"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    width:200,
    height:200
  }
});


import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {

  return (
    <SafeAreaView edges={["top","bottom"]} style = {styles.container}>
    <View style = {styles.content}>
      <Image style = {styles.image} source={require("@/assets/images/splash-icon.png")}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#000" 
  },
  content: {
    flex:1,
    justifyContent: "center",
  },
  image: {
    height:60,
    width: 60,
    alignSelf:"center"
  }
});


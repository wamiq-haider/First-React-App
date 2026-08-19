import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import {Image} from "expo-image";
import { Link, useRouter } from "expo-router";
import {Button, Host} from "@expo/ui/swift-ui"


export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>stuff.</Text>
      <TextInput placeholder="Email is happening here"/>
      <ActivityIndicator size={"large"}/>
      <Link href={"/about"}>Go to about screen</Link>
      <Host>
      <Button  onPress={()=> router.push("/about")}><Text>Navigate</Text></Button>
      </Host>
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

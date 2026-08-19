import { Text, View, StyleSheet, TextInput,  Button as RNButton, } from "react-native";
import {BottomSheet, Button, ColorPicker, Host, VStack} from "@expo/ui/swift-ui"
import { useState } from "react";


export default function Profile() {
  const [isOpened, setIsOpened] = useState(false);
  const [color, setColor] = useState("#FF6347");
  return (
    <View style={styles.container}>
     <Text>Profile details</Text>

     <Host>
       <Button onPress={() => setIsOpened(true)}>
          <Text>Open bottom sheet</Text>
        </Button>
        <ColorPicker selection={color} onSelectionChange={setColor}/>
        <VStack>
          <BottomSheet isPresented = {isOpened} onIsPresentedChange={setIsOpened}>
            <View style = {{height: 500 }}>
              <Text>Hello!</Text> 
              </View>
          </BottomSheet>
        </VStack>
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

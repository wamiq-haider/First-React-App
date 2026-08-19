import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{animation:"ios_from_right", headerShown:false}}>
   
    <Stack.Screen name= "(tabs)"/>

  </Stack>;
}

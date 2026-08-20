import { Stack, useRouter } from "expo-router";
import { useEffect, useReducer } from "react";

export default function RootLayout() {
  const router = useRouter();

  let isAuth = false;
  useEffect(()=>{
    if (!isAuth){
      router.replace("/(auth)/login");
    }
    else{
      router.replace("/(tabs)");
    }
  })
  return <Stack screenOptions={{animation:"ios_from_right", headerShown:false}}>
    
    if()
    <Stack.Screen name= "(tabs)"/>
    <Stack.Screen name= "(auth)"/>


  </Stack>;
}

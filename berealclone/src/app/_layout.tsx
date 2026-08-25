import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

//these functions we create return a bunch of components and in turn become components themselves. a RouteGuard component is gonna have a Stack with stack screens.

function RouteGuard(){
  const router = useRouter();
  const {user,isLoading} = useAuth();
  const segments = useSegments();

  // useSegments just creates an array of the different files till the last one, since auth is first it is in position 0 in the array. 

  const inAuthGroup = segments[0] === "(auth)" 
  const inTabsGroup = segments[0] === "(tabs)" 


  //a useEffect function will run anytime any of the values in its array will change. So if user goes from null to user, then it means it changes

   useEffect(()=>{

    if (isLoading) {
      if (segments.join("/") !== "(auth)/loading") {
        router.replace("/(auth)/loading");
      }
    return;
  }
   
    if (!user){
      if (!inAuthGroup){
        router.replace("/(auth)/login");
      }
      return;
    } 
    else{
      if(!inTabsGroup){
        router.replace("/(tabs)");
      }
    }
  }, [user,isLoading,segments,router]);

  return (
     <Stack screenOptions={{animation:"fade", headerShown:false}}>
    <Stack.Screen name= "(tabs)"/>
    <Stack.Screen name= "(auth)"/>
  </Stack> 
  );
}

export default function RootLayout() {
  return <AuthProvider>
    <RouteGuard/>
  </AuthProvider>;
}

import { useAuth } from "@/context/AuthContext";
import { bold } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View,Text, TextInput, TouchableOpacity,StyleSheet, Alert, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { supabase } from "@/lib/supabase/client";
import { uploadProfileImage } from "@/lib/supabase/storage";



export default function SignUpScreen() {
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [isLoading,setIsLoading] = useState(false);
 const [profileImage ,setProfileImage] = useState<string | null>(null);
 const {user,updateUser } = useAuth();
 const router = useRouter();

  const pickImage = async ()=> {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status !== "granted"){
      Alert.alert("Permission needed",
        "We need camera roll permissions to select a profile image.");
    return;
     };
  
   const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:"images",
    allowsEditing:true,
    aspect:[1,1],
    quality: 0.8,
  });
  if(!result.canceled && result.assets[0]){
    setProfileImage(result.assets[0].uri);
  }

  }
  const takePhoto = async ()=>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== "granted"){
      Alert.alert("Permission needed",
        "We need camera permissions to take a photo.");
    return;
     };

    const result = await ImagePicker.launchCameraAsync({
    allowsEditing:true,
    aspect:[1,1],
    quality: 0.8,
  });

  }
  const showImagePicker = ()=> {
    Alert.alert("Select Profile Image", "Choose an option",[
      {text:"Camera", onPress: takePhoto},
      {text:"Photo Library", onPress: pickImage},
      {text:"Cancel", style: "cancel"}

    ]   
    )
  }
  const handleComplete = async ()=> {

     if(!name || !username){
      Alert.alert("Error, please fill in all fields");
    }

    if(username.length < 4){
      Alert.alert("Password must be at least 8 characters");
    }

    setIsLoading(true);

    try{
      if(!user) {
        throw new Error("User not authenticated");
      }

      const {data: existingUser} = await supabase.from("profiles").select("id").eq("username",username).neq("id",user.id).single();

      if(existingUser) {
        Alert.alert("Error", 
        "This username already exists. Please choose another one.");
         
        setIsLoading(false);
        return;
      }

      //upload profile img
      let profileImageUrl: string | undefined;
      if(profileImage){
        try{
         profileImageUrl = await uploadProfileImage(user.id,profileImage)
        } catch (error) {
          console.error("Error uploading profile image", error);
          Alert.alert(
            "Warning",
            "Failed to upload profile image. Continue without image."
          );
        }
      }

      await updateUser(
       {name,
       username,
       profileImage: profileImageUrl,
      onboardingCompleted: true}); 
      router.replace("/(tabs)");
    }
    //Update profile
    
    
    catch (error){
       Alert.alert("Error, Failed to complete onboarding. Please try again.");
    }
  }
  return (
    <SafeAreaView edges={["top","bottom"]} style = {styles.container}>
    <View style = {styles.content}>
      <View style = {styles.header}>
        <Text style = {styles.title}>Complete your profile</Text>
        <Text style = {styles.subtitle}>add your information to get started</Text>
      </View>

      <View style = {styles.form}>
      <TouchableOpacity style = {styles.imageContainer} onPress={showImagePicker}>
        
        {profileImage ? (
          <Image source={{uri:profileImage}} style={styles.profileImage} />
        ) : (<View style = {styles.placeholderImage}>
          <Text style = {styles.placeholderText }>+</Text>
        </View>)}
        <View style = {styles.editBadge}>
         <Text style = {styles.editText}>Edit</Text>
        </View>
      </TouchableOpacity>

      <TextInput 
              placeholder="Full Name" 
              placeholderTextColor={"#999"}
              autoCapitalize="words"
              value= {name}
              onChangeText={setName}
              style = {styles.input}
        />
       <TextInput 
              placeholder="Username" 
              placeholderTextColor={"#999"}
              autoCapitalize="none"
              autoComplete="username"
              value= {username}
              onChangeText={setUsername}
              style = {styles.input}
        />

        <TouchableOpacity style = {styles.button} onPress={handleComplete}>
                  {isLoading ? (<ActivityIndicator size={24} color="#fff"/>)
                   : (<Text style = {styles.buttonText} >Complete setup</Text>)}
        </TouchableOpacity>

    </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  content: {
    flex:1,
    justifyContent: "center",
    padding:24,

  },
  header:{
    marginBottom:32
  },
  title:{
    fontSize: 32,
    fontWeight: "bold",
    marginBottom:8
  },
  subtitle:{
    fontSize: 16,
    marginBottom:32,
    color: "#666"
  },
  form:{
    width:"100%",
    alignItems:"center"
  },
  imageContainer:{
    marginBottom:32,
    position:"relative"
  },
  profileImage:{
    width:120,
    height:120,
    borderRadius:60,
    backgroundColor: "#f5f5f5"
  },
  placeholderImage:{
    width:120,
    height:120,
    position:"relative",
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor:"#e0e0e0",
    backgroundColor:"#f5f5f5",
    borderStyle:"dashed"
  },
  placeholderText:{
    fontSize:48,
    color:"#999"
  },
  editBadge:{
    position:"absolute",
    bottom:0,
    right:0,
    backgroundColor:"#000",
    paddingHorizontal: 12,
    paddingVertical:6,
    borderRadius:16
  },
  editText:{
    color:"#fff",
    fontSize:12,
    fontWeight:600
  },
  input:{
    backgroundColor:"#f5f5f5",
    borderRadius:12,
    padding:16,
    fontSize:16,
    marginBottom:16,
    width:"100%",
    borderWidth:1,
    borderColor:"#e0e0e0"
  },
  button:{
    backgroundColor:"#000",
    borderRadius:12,
     width:"100%",
    padding:16,
    alignItems:"center"
  },
  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:600
  },
  linkButton:{
    marginTop:24,
    alignItems:"center",
  },
  linkButtonText:{
    color:"#666",
    fontSize:14
  },
  linkButtonTextBold:{
    color:"#000",
    fontWeight:600
  }
});



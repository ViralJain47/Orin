import { Text, TouchableOpacity, View,  Image } from "react-native";
import {styles} from "../../styles/auth.styles"
import { Link, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {

  const {signOut} = useAuth();
    return (

    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{color:"white"}}>Signout</Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.title}>hello</Text>
    //   <TouchableOpacity onPress={() => alert("you touched.")}>
    //       <Text>Press me</Text>
    //   </TouchableOpacity>

    //   {/* <Image 
    //   source={require("../assets/images/favicon.png")}
    //   style={{width:100,height:100}}
    //   /> */}

    //   <Image 
    //   source={{
    //     uri:"https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?uid=R190744070&ga=GA1.1.1301828079.1741440466&semt=ais_hybrid&w=740"
    //     }}
    //   style={{width:200,height:200}}  
    //     />

    //     <Link href={"/notifications"}>notification screen</Link>
    //     <Link href={"/profile"}>Profile screen</Link>
    // </View>
  );
}


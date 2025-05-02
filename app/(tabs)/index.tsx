import { Loader } from "@/components/Loader";
import Post from "@/components/Post";
import StoriesSection from "@/components/Stories";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {

  const {signOut} = useAuth();
  const [refreshing,setRefreshing] = useState(false);

  const posts = useQuery(api.posts.getFeedPosts);

  if(posts === undefined) return <Loader />

  if(posts.length === 0) return <NoPostsFound />

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    },2000);
  }

    return (

    <View style={styles.container}>
      
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orin </Text>
        {/* <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white}/>
        </TouchableOpacity> */}
        <Link
        href="https://github.com/ViralJain47"
        >
          <Ionicons name="logo-github" size={30} color={COLORS.primary}/>
        </Link>
      </View>

      {/* stories */}
      {/* by using scrollview it renders all sort of things which may cause our application */}
      {/* <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{paddingBottom:60}}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {
            STORIES.map((story) =>(
              <Story key={story.id} story={story}/>
            ))
          }
        </ScrollView>

        {
          posts.map((post) =>(
            <Post key={post._id} post={post}/>
          ))
        }
      </ScrollView> */}

      <FlatList 
      data={posts}
      renderItem={({item}) => <Post post={item}/>}
      keyExtractor={(item) =>item._id}
      showsVerticalScrollIndicator = {false}
      contentContainerStyle={{paddingBottom:60}}
      ListHeaderComponent={<StoriesSection />}
      refreshControl={
        <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary} 
        />
      }
      />

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


const NoPostsFound = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orin</Text>
        <Link
        href="https://github.com/ViralJain47"
        >
          <Ionicons name="logo-github" size={30} color={COLORS.primary}/>
        </Link>
      </View>
      <View>
        <StoriesSection />
      </View>
    <View
    style={{
      flex:1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems:"center"
    }}
    >
    <Text style={{fontSize:23 , color:COLORS.primary, height:"18%"}}>No posts yet</Text>
  </View>
  </View>
  )
}
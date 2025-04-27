import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader } from '@/components/Loader';
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/notifications.styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { formatDistanceToNow } from 'date-fns';
import Notification from '@/components/Notifications';

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications);

  if(notifications === undefined) return <Loader/>;
  if(notifications.length === 0) return <NoNotificationsFound />
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
      data={notifications}
      renderItem={({item}) => <Notification notification={item}/>}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator = {false}
      contentContainerStyle={styles.listContainer}
      />
    </View>
  )
};


const NoNotificationsFound = () => {
  return (
    <View
    style={{
      flex:1,
      justifyContent: "center",
      alignItems : "center",
      backgroundColor : COLORS.background
    }}
    >
      <Ionicons name='notifications-circle' size={40} style={{width:40, height:40}} color={COLORS.primary}/>
      <Text style={{color:COLORS.primary, fontSize:22}}>No notifications yet</Text>
    </View>
   )
}
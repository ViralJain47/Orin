import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function InitialLayout(){
    const {isLoaded,isSignedIn} = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if(!isLoaded) return;

        const inAuthScreen = segments[0] === "(auth)";

        if(!isSignedIn && !inAuthScreen)  router.replace("/(auth)/login")
        else if(isSignedIn && inAuthScreen) router.replace("/(tabs)") 
    },[isLoaded, isSignedIn,segments])

    if(!isLoaded) return null;

    return <Stack screenOptions={{headerShown:false}}/>
}
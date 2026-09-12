import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const ProfileIconProp = ({ size = 96, color = 'grey' }) => {
    return (
        <View style={{ alignItems: "center"}}>
            <Ionicons name='person-circle' size={size} color={color} />
            <Text> Profile Icon</Text>
        </View>
    )
};

export default ProfileIconProp;
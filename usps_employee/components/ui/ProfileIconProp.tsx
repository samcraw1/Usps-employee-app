import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { Palette } from "@/constants/theme";

type ProfileIconProps = {
  size?: number;
  color?: string;
};

const ProfileIconProp = ({
  size = 96,
  color = Palette.blue,
}: ProfileIconProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="person-circle"
        size={size}
        color={color}
        // Decorative — the employee's name is rendered next to it as text.
        accessible={false}
      />
    </View>
  );
};

export default ProfileIconProp;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

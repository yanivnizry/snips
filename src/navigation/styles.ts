import { StyleSheet } from "react-native";
import { COLORS } from "@/services/constants/common";

export default StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.BACKGROUND,
    },
    placeholderText: {
      color: COLORS.PRIMARY_TEXT,
      fontSize: 18,
      fontWeight: '600',
    },
  });
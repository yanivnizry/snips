import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/common";
import { TYPOGRAPHY } from "@/constants/typography";

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
      ...TYPOGRAPHY.PLACEHOLDER,
      color: COLORS.PRIMARY_TEXT,
    },
  });
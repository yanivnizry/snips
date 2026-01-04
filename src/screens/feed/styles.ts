import { StyleSheet } from "react-native";
import { COLORS } from "@/services/constants/Constants";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.BACKGROUND,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: COLORS.PRIMARY_TEXT,
      fontSize: 18,
      fontWeight: '600',
    },
  });
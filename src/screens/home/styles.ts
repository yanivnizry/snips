import { COLORS } from "@/services/constants/Constants";
import { StyleSheet } from "react-native";

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
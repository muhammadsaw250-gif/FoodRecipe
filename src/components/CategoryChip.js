
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CategoryChip({
  title,
  active,
  onPress
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={[styles.text, active && styles.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    marginRight: 9,
    borderWidth: 1,
    borderColor: "#EEE4D9"
  },
  active: {
    backgroundColor: "#E58B38",
    borderColor: "#E58B38"
  },
  text: {
    color: "#777",
    fontSize: 13,
    fontWeight: "500"
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

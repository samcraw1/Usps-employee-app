import { StyleSheet, Text, View } from "react-native";
import type { Employee, Station, Shift } from "./types.js";
import { mockSchedule } from "./mockSchedule";

const hour = new Date().getHours();

const timeOfDay =
  hour < 12
    ? 'morning'
    : hour < 18
      ? 'afternoon'
      : 'evening';

      const sam: Employee = {
        name: "Sam",
        employeeId: "12345"
      }


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good {timeOfDay}, {sam.name}</Text>

    
   <View style={styles.table}>
      <View style={styles.row}>

{mockSchedule.map((shift) => (
    <View style={styles.cell} key={shift.date}>
      <Text style={styles.date}>{shift.date}</Text>
      <Text style={styles.bt}>{shift.NS ? "NS" : shift.BT}</Text>
    </View>
  ))}
  
  </View>
</View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    width: "100%",
  },

  cell: {
    flex: 1,
    borderRightWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  date: {
    fontWeight: "bold",
    fontSize: 12,
  },

  bt: {
    marginTop: 8,
    fontSize: 14,
  },
});
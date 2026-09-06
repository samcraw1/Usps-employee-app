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

      const station: Station = {
        name: "Midtown"
      }


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.greeting]}>Good {timeOfDay}, {sam.name}</Text>
      
      <View style={styles.today}>
        <Text style={styles.label}>TODAY:</Text>
        <Text>BT: {mockSchedule?.[0]?.BT ?? "N/A"}</Text>
        <Text>Station: {station.name}</Text>
      </View>

      <View style= {styles.today}>
        <Text style={styles.label}>TOMORROW:</Text>
        <Text>{mockSchedule[1].NS ? "NS" : mockSchedule[1].BT}</Text>
        <Text>Station: {station.name}</Text>
      </View>
      

   <View style={styles.table}>
      <View style={styles.row}>
        <Text>This Week Schedule</Text>

{mockSchedule?.map((shift,index) => (
    <View style={styles.cell} key={`${shift.date}-${index}`}>
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
    padding: 24,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  table: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
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
  today: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  }
});
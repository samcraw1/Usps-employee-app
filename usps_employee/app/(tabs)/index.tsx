import { StyleSheet, Text, View, ScrollView } from "react-native";
import type { Employee, Station, Shift } from "./types.js";
import { mockSchedule } from "./mockSchedule";
import { Palette, shadow } from "../../constants/theme";


const hour = new Date().getHours();

const timeOfDay =
  hour < 12
    ? 'morning'
    : hour < 18
      ? 'afternoon'
      : 'evening';



      const station: Station = {
        name: "Midtown"
      }
const uploadedTime = new Date().toLocaleTimeString();


export default function HomeScreen() {
  return (
   
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <Text style={[styles.greeting]}>Good {timeOfDay}, Sam</Text>
      
      <View style={styles.boxContainer}>
        <Text style={styles.label}>TODAY:</Text>
        <Text>BT: {mockSchedule?.[0]?.BT ?? "N/A"}</Text>
        <Text>Station: {station.name}</Text>
      </View>

      <View style= {styles.boxContainer}>
        <Text style={styles.label}>TOMORROW:</Text>
        <Text>{mockSchedule[1].NS ? "NS" : mockSchedule[1].BT}</Text>
        <Text>Station: {station.name}</Text>
      </View>
      
  <Text style={styles.label}>This week:</Text>
   <View style={styles.tableBox}>
      <View style={styles.row}>

{mockSchedule?.map((shift,index) => (
    <View style={styles.cell} key={`${shift.date}-${index}`}>
      <Text style={styles.date}>{shift.date}</Text>
      <Text style={styles.bt}>{shift.NS ? "NS" : shift.BT}</Text>
    </View>
  ))}
  
    </View>
  </View>
  <Text style={styles.uploadedTime}>schedule updated at {uploadedTime}</Text>
  <View style={{ flex: 1 }}/>
  <View style={{
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 16,
  }}>
    <View style={{
      padding: 16,
      borderWidth: 1,
      borderRadius: shadow.shadowRadius
    }}>
      <Text style={styles.annoucementHeader}>Announcements</Text>
      <Text style={styles.announcementText}>No new announcements.</Text>
    </View>
  </View>
</View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Palette.background,
   
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  table: {
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
    borderBottomWidth: 2,
    paddingBottom: 4,
    width: "100%",
  },

  bt: {
    marginTop: 8,
    fontSize: 14,
  },
  boxContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: shadow.shadowRadius,
    marginBottom: 16,
    backgroundColor: Palette.card,
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: shadow.shadowRadius,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: Palette.card,
  },
  uploadedTime: {
    marginTop: 16,
    fontSize: 12,
    color: Palette.textMuted,
  },
  announcementText: {
    fontSize: 14,
    color: Palette.textMuted,
  },
  annoucementHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  }

});
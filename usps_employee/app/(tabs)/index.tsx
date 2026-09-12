import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { mockSchedule } from "@/constants/mock-schedule";
import type { Station } from "@/constants/schedule-types";
import { Palette, radius, spacing, type } from "@/constants/theme";

const station: Station = {
  name: "Midtown",
};

/** "0800" -> "08:00". Begin-tour times arrive as four digits. */
function formatTour(bt: string | undefined) {
  if (!bt || bt.length !== 4) {
    return "—";
  }
  return `${bt.slice(0, 2)}:${bt.slice(2)}`;
}

type ShiftCardProps = {
  when: string;
  bt: string | undefined;
  isOff: boolean;
};

function ShiftCard({ when, bt, isOff }: ShiftCardProps) {
  return (
    <Card>
      <View style={styles.shiftRow}>
        <View style={styles.shiftMain}>
          <Text style={styles.shiftWhen}>{when}</Text>
          {isOff ? (
            <View style={styles.offPill}>
              <Text style={styles.offPillText}>Non-scheduled</Text>
            </View>
          ) : (
            <>
              <Text style={styles.shiftTime}>{formatTour(bt)}</Text>
              <Text style={styles.shiftCaption}>Begin tour</Text>
            </>
          )}
        </View>

        <View style={styles.shiftMeta}>
          <Text style={styles.shiftMetaLabel}>Station</Text>
          <Text style={styles.shiftMetaValue}>{station.name}</Text>
        </View>
      </View>
    </Card>
  );
}

export default function HomeScreen() {
  // Computed per render, not at module import — otherwise the greeting and the
  // "updated" timestamp freeze at whatever they were when the app launched.
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  const uploadedTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const today = mockSchedule?.[0];
  const tomorrow = mockSchedule?.[1];

  return (
    <Screen
      title={`Good ${timeOfDay}, Sam`}
      subtitle={`${station.name} Station`}
    >
      <SectionHeader title="Your shifts" />

      <ShiftCard
        when="Today"
        bt={today?.BT}
        isOff={today?.NS ?? false}
      />
      <ShiftCard
        when="Tomorrow"
        bt={tomorrow?.BT}
        isOff={tomorrow?.NS ?? false}
      />

      <SectionHeader title="This week" />

      <Card padded={false}>
        <View style={styles.week}>
          {mockSchedule?.map((shift, index) => (
            <View
              style={[
                styles.cell,
                index < mockSchedule.length - 1 && styles.cellDivider,
              ]}
              key={`${shift.date}-${index}`}
            >
              <View style={styles.cellHead}>
                <Text style={styles.cellDate}>{shift.date.slice(3)}</Text>
              </View>
              <Text style={[styles.cellValue, shift.NS && styles.cellValueOff]}>
                {shift.NS ? "NS" : shift.BT.slice(0, 2)}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Text style={styles.updated}>Updated {uploadedTime}</Text>

      <SectionHeader title="Announcements" />

      <Card>
        <View style={styles.announcement}>
          <View style={styles.announcementIcon}>
            <Ionicons name="megaphone-outline" size={18} color={Palette.blue} />
          </View>
          <Text style={styles.announcementText}>Nothing new today.</Text>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shiftRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  shiftMain: {
    flex: 1,
  },
  shiftWhen: {
    ...type.label,
    color: Palette.textMuted,
    marginBottom: spacing.xs,
  },
  shiftTime: {
    ...type.h1,
    ...type.tabular,
    color: Palette.blue,
  },
  shiftCaption: {
    ...type.caption,
    color: Palette.textMuted,
  },
  offPill: {
    alignSelf: "flex-start",
    backgroundColor: Palette.blueTint,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginTop: spacing.xs,
  },
  offPillText: {
    ...type.title,
    color: Palette.blue,
  },
  shiftMeta: {
    alignItems: "flex-end",
  },
  shiftMetaLabel: {
    ...type.caption,
    color: Palette.textMuted,
  },
  shiftMetaValue: {
    ...type.body,
    color: Palette.text,
  },

  week: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    alignItems: "center",
  },
  cellDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: Palette.divider,
  },
  cellHead: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Palette.blueTint,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.border,
  },
  cellDate: {
    ...type.caption,
    ...type.tabular,
    fontWeight: "600",
    color: Palette.blue,
  },
  cellValue: {
    ...type.body,
    ...type.tabular,
    color: Palette.text,
    paddingVertical: spacing.md,
  },
  cellValueOff: {
    color: Palette.red,
    fontWeight: "600",
  },

  updated: {
    ...type.caption,
    color: Palette.textMuted,
    textAlign: "center",
    marginTop: -spacing.sm,
  },

  announcement: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  announcementIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: Palette.blueTint,
    alignItems: "center",
    justifyContent: "center",
  },
  announcementText: {
    ...type.body,
    color: Palette.textMuted,
  },
});

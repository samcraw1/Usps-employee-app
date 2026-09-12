import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Palette, spacing, type } from "@/constants/theme";

const FAQS = [
  {
    question: "How do I change my password?",
    answer:
      "Open the Profile tab and tap Change password. Enter your new password and tap Save.",
  },
  {
    question: "Where do I see my schedule?",
    answer:
      "The Schedule tab shows your upcoming shifts, including start and end times.",
  },
  {
    question: "My schedule looks wrong. What do I do?",
    answer:
      "Schedules are set by your supervisor. Contact them directly so the change can be made at the station.",
  },
  {
    question: "I can't make my shift. Who do I tell?",
    answer:
      "Call your station as early as you can and speak to your supervisor. Do not report absences through this app.",
  },
  {
    question: "Why is my name or information out of date?",
    answer:
      "Employee records come from HR. Submit a change through HR and it will appear here once it is processed.",
  },
];

export default function Help() {
  return (
    <Screen title="Help" subtitle="Frequently asked questions">
      {FAQS.map((faq) => (
        <Card key={faq.question}>
          {/* Grouped so a screen reader reads the question and its answer as
              one item rather than two disconnected lines. */}
          <View accessible accessibilityLabel={`${faq.question} ${faq.answer}`}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  question: {
    ...type.title,
    color: Palette.text,
    marginBottom: spacing.sm,
  },
  answer: {
    ...type.body,
    color: Palette.textMuted,
    lineHeight: 21,
  },
});

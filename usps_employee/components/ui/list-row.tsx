import { Ionicons } from "@expo/vector-icons";
import { Children, Fragment, type ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { Card } from "@/components/ui/card";
import { Palette, radius, spacing, type } from "@/constants/theme";

type RowGroupProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Groups rows into one card with hairlines between them. Inserting the
 * dividers here means rows never need to know whether they are first or last.
 */
export function RowGroup({ children, style }: RowGroupProps) {
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <Card padded={false} style={style}>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 ? <View style={styles.divider} /> : null}
          {row}
        </Fragment>
      ))}
    </Card>
  );
}

type ListRowProps = {
  label: string;
  onPress?: () => void;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  /** Right-aligned secondary text, for read-only rows. */
  value?: string;
  showChevron?: boolean;
  destructive?: boolean;
};

export function ListRow({
  label,
  onPress,
  icon,
  value,
  showChevron,
  destructive = false,
}: ListRowProps) {
  const chevron = showChevron ?? Boolean(onPress);

  const content = (
    <>
      {icon ? (
        <View style={[styles.iconChip, destructive && styles.iconChipAlert]}>
          <Ionicons
            name={icon}
            size={16}
            color={destructive ? Palette.red : Palette.blue}
          />
        </View>
      ) : null}

      <Text style={[styles.label, destructive && styles.labelAlert]}>
        {label}
      </Text>

      <View style={styles.spacer} />

      {value ? <Text style={styles.value}>{value}</Text> : null}
      {chevron ? (
        <Ionicons name="chevron-forward" size={18} color={Palette.chevron} />
      ) : null}
    </>
  );

  if (!onPress) {
    return <View style={styles.row}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowPressed: {
    backgroundColor: "#F7F8FA",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Palette.divider,
    marginLeft: spacing.lg,
  },
  iconChip: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: Palette.blueTint,
    alignItems: "center",
    justifyContent: "center",
  },
  iconChipAlert: {
    backgroundColor: Palette.redTint,
  },
  label: {
    ...type.title,
    color: Palette.text,
  },
  labelAlert: {
    color: Palette.red,
  },
  spacer: {
    flex: 1,
  },
  value: {
    ...type.body,
    color: Palette.textMuted,
  },
});

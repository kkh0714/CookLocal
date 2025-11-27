import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

const HEADER_HEIGHT = 60;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
  title: string;
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
  title,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor[colorScheme] }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView style={styles.content}>{children}</ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

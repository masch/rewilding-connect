import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Monorepo magic!
import { OrderSchema } from '@repo/shared';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 Impenetrable Connect</Text>
      <Text style={styles.subtitle}>Workspace Test (@repo/shared):</Text>
      
      {/* Printing Zod schema keys to verify successful import */}
      <Text style={styles.code}>
        OrderSchema Keys: {Object.keys(OrderSchema.shape).join(', ')}
      </Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  code: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'monospace',
    textAlign: 'center',
  }
});

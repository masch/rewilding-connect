import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs tintColor="primary">
      <NativeTabs.Trigger name="project">
        <NativeTabs.Trigger.Label>Projects</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "list.bullet", selected: "list.bullet" }}
          md="list"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

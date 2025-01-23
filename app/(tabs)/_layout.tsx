import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0B2F9F' }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={30} name="home" color={color} />,
        }}
      />
        <Tabs.Screen
          name="Vaccines"
          options={{
            headerShown: false,
            title: 'Vaccines',
            tabBarIcon: ({ color }) => <FontAwesome size={30} name="medkit" color={color} />,
          }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={30} name="user" color={color} />,
        }}
      />
        {/* <Tabs.Screen
          name="setting"
          options={{
           headerShown: false,
            title: 'Settings',
            tabBarIcon: ({ color }) => <FontAwesome size={30} name="cog" color={color} />,
          }}
        /> */}
        {/* <Tabs.Screen
          name="Notification"
          options={{
           headerShown: false,
            title: 'Notifications',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
          }}
        /> */}
    </Tabs>
  );
}

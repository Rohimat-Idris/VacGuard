import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }}/>
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }}/>
      <Stack.Screen 
        name="Signup" 
        options={{ headerShown: false }}/>
      <Stack.Screen 
        name="EditProfile" 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="ChangePassword" 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="AddChild" 
        options={{ headerShown: false }}/>
        
      <Stack.Screen 
        name="ChildProfile" 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="ViewProfile" 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="ChildrenList" 
        options={{ headerShown: false }}/>

      <Stack.Screen
      name='ForgetPassword'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='ViewDetail'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='WelcomeProfile'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='Notifications'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='SetReminder'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='AddRecord'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='Views'
      options={{headerShown: false}}
      />
      <Stack.Screen
      name='EditChild'
      options={{headerShown: false}}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

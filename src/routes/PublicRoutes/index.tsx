import { Login } from "@/screens/Login"
import { Register } from "@/screens/Register"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

export const PublicRoutes = () => {
  const PublicStack = createNativeStackNavigator<PublicStackParamsList>()

  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="Register" component={Register} />
    </PublicStack.Navigator>
  )
}
import { Stack, router, Redirect } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
	const { isSignedIn } = useAuth();

	if (!isSignedIn) {
		return <Redirect href={"/signIn"} />;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="groupSelector"
				options={{ animation: "slide_from_bottom", headerShown: false }}
			/>
			<Stack.Screen
				name="post/[id]"
				options={{
					headerTitle: "",
					headerStyle: { backgroundColor: "#FF5700" },
					headerLeft: () => (
						<AntDesign name="close" size={24} color="white" onPress={() => router.back()} />
					),
					headerRight: () => (
						<View style={{ flexDirection: "row", gap: 10 }}>
							<AntDesign name="search1" size={24} color="white" />
							<MaterialIcons name="sort" size={27} color="white" />
							<Entypo name="dots-three-horizontal" size={24} color="white" />
						</View>
					),
					animation: "slide_from_bottom",
				}}
			/>
		</Stack>
	);
}

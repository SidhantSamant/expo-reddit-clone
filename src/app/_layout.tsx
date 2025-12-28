import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import tokenCache from "./cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
	if (!publishableKey) {
		throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
	}

	return (
		<>
			<StatusBar style="dark" />
			<QueryClientProvider client={queryClient}>
				<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
					<ClerkLoaded>
						<Slot />
					</ClerkLoaded>
				</ClerkProvider>
			</QueryClientProvider>
		</>
	);
}

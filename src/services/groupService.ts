// import { supabase } from "../lib/supbase";

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export async function fetchGroups(supabase: SupabaseClient<Database>, search: string) {
	const { data, error } = await supabase.from("groups").select("*").ilike("name", search);

	if (error) {
		console.log("fetchGroups: ", error);
		throw error;
	} else {
		// setPosts(data as Post[]);
		return data;
	}
}

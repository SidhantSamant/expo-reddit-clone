import { SupabaseClient } from "@supabase/supabase-js";
// import { supabase } from "../lib/supbase";
import { Database } from "../types/database.types";

export async function fetchPosts(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase
		.from("posts")
		// .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
		.select("*, group:groups(*), upvotes(value.sum())")
		.order("created_at", { ascending: false });

	if (error) {
		console.log("fetchPosts: ", error);
		throw error;
	} else {
		return data;
	}
}

export async function fetchPostById(supabase: SupabaseClient<Database>, id: string) {
	const { data, error } = await supabase
		.from("posts")
		// .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
		.select("*, group:groups(*), upvotes(value.sum())")
		.eq("id", id)
		.single();

	if (error) {
		console.log("fetchPostById: ", error);
		throw error;
	} else {
		return data;
	}
}
// export async function fetchPostUpvotes(supabase: SupabaseClient<Database>, id: string) {
// 	const { data, error } = await supabase
// 		.from("upvotes")
// 		.select("value.sum()")
// 		.eq("post_id", id)

// 	if (error) {
// 		console.log("fetchPostById: ", error);
// 		throw error;
// 	} else {
// 		return data;
// 	}
// }

export async function deletePostById(supabase: SupabaseClient<Database>, id: string) {
	const { data, error } = await supabase.from("posts").delete().eq("id", id);

	if (error) {
		console.log("fetchPostById: ", error);
		throw error;
	} else {
		return data;
	}
}

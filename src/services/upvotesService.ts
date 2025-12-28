import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export async function createUpvotes(supabase: SupabaseClient<Database>,post_id:string,value:1|-1) {
    const { data, error } = await supabase
        .from("upvotes")
        .upsert({post_id,value})
        .select()
        .single()

    if (error) {
        console.log("createUpvotes: ", error);
        throw error;
    } else {
        return data;
    }
}

export async function selectMyUpvotes(supabase: SupabaseClient<Database>,post_id:string,user_id:string) {
    const { data, error } = await supabase
        .from("upvotes")
      .select( "*" )
      .eq("post_id", post_id)
      .eq("user_id", user_id)
        .single()

    if (error) {
        console.log("selectMyUpvotes: ", error);
        throw error;
    } else {
        return data;
    }
}

import { ActivityIndicator, FlatList, Text } from "react-native";
import PostListItem from "../../../components/PostListItem";
// import posts from "../../../../assets/data/posts.json";
import { useEffect, useState } from "react";
import { useSupbase } from "../../../lib/supbase";
import { Post } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/postService";
import { Tables } from "../../../types/database.types";

// export type Post = Tables<"posts"> & { group: Tables<"groups">; user: Tables<"users"> };
// export type Post = Tables<"posts"> & { group: Tables<"groups"> };
export default function HomeScreen() {
	// const [posts, setPosts] = useState<Post[]>([]);
	const supabase = useSupbase();

	const {
		data: posts,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => fetchPosts(supabase),
	});

	// useEffect(() => {
	// 	supabase
	// 		.from("posts")
	// 		.select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
	// 		.order("created_at", { ascending: false })
	// 		.then(({ data, error }) => {
	// 			if (error) {
	// 				console.log("error: ", error);
	// 			}
	// 			if (data) {
	// 				setPosts(data as Post[]);
	// 			}
	// 		});
	// }, []);

	if (isLoading) {
		return <ActivityIndicator />;
	}
	if (error) {
		return <Text>Error fetching posts</Text>;
	}
	return <FlatList data={posts} renderItem={({ item }) => <PostListItem post={item} />} />;
}

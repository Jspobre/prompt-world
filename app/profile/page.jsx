"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";


const ProfilePage = () => {
const { data: session } = useSession();
const router = useRouter()
const [posts, setPosts ] = useState([]);

useEffect(() => {
  const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
       setPosts(data)
  }
  if(session?.user.id){
    fetchPosts()
  }
}, [])

const handleEdit = (post) => {
  router.push(`/update-prompt?id=${post._id}`)
}

const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed ){
        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
            })

            const filteredPosts = posts.filter((p) => 
                p._id !== post_id
            
        )
            setPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }
}

  return (
      <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
  )
}

export default ProfilePage

"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
const { data: session } = useSession();

  return (
    <section>
          <Image 
          src={session?.user.image}
          width={37}
          height={37}
          className="rounded-full"
          alt="Profile"
          />
    </section>
  )
}

export default Profile

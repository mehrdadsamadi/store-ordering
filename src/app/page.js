"use client"

import ConfirmBtn from "@/components/common/ConfirmBtn";
import { logout } from "@/helpers/logout";
import { getClientSession } from "@/helpers/sessions";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export default function Home() {

  const [user, setUser] = useState()

  useLayoutEffect(() => {
    getClientSession()
      .then(res => res.json())
      .then(user => {
        if (user)
          setUser(user)
      })
  }, [])

  return (
    <section>
      {
        user && (
          <p>{user.first_name} {user.last_name}</p>
        )
      }
      <Link href={"/admin"} className="button">ادمین</Link>
      <Link href={"/login"} className="button">ورود</Link>
      <Link href={"/user/storeOwner"} className="button">فروشگاه دار</Link>
      <Link href={"/user/driver"} className="button">راننده</Link>
      <ConfirmBtn onConfirm={logout} confirmBtnText="خروج" title="برای خروج مطمعن هستید؟">خروج</ConfirmBtn>
    </section>
  );
}

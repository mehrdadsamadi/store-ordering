"use client"

import { logout } from "@/helpers/logout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/admin"} className="button">ادمین</Link>
      <button onClick={logout}>خروج</button>
    </>
  );
}

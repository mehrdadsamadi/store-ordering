"use client"

import ConfirmBtn from "@/components/common/ConfirmBtn";
import { logout } from "@/helpers/logout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/admin"} className="button">ادمین</Link>
      <Link href={"/login"} className="button">ورود</Link>
      <Link href={"/user"} className="button">فروشگاه دار</Link>
      <ConfirmBtn onConfirm={logout} confirmBtnText="خروج" title="برای خروج مطمعن هستید؟">خروج</ConfirmBtn>
    </>
  );
}

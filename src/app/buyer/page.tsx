import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookiesStore = await cookies();
  const sessionToken = cookiesStore.get("sessionToken");

  redirect("/buyer/main");
}

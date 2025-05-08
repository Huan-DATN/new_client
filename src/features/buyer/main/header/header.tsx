import { cookies } from 'next/headers';
import BottomHeader from "./bottom-header";
import TopHeader from "./top-header";

async function Header() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  return (
    <header className="sticky top-0 z-50 w-full">
      <TopHeader />
      <BottomHeader sessionToken={sessionToken} />
    </header>
  );
}

export default Header;

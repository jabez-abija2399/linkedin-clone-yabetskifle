
import { getUnreadNotificationCount } from "@/server/actions/notification.actions";
import { auth } from "@/lib/auth";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
    const session = await auth();
    const user = session?.user;
    const unreadCount = await getUnreadNotificationCount();

    return <NavbarClient user={user} unreadCount={unreadCount} />;
}
import { getNotifications } from "@/server/actions/notification.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader className="border-b">
                <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {notifications.length === 0 ? (
                    <p className="p-6 text-center text-muted">No notifications yet</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className="flex gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
                            {/* Avatar */}
                            <div className="relative h-10 w-10 flex-shrink-0">
                                <Image
                                    src={notification.creator.image || "/placeholder.png"}
                                    alt={notification.creator.name || "User"}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            
                            {/* Content */}
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold text-foreground">
                                        {notification.creator.name}
                                    </span>{" "}
                                    {notification.type === "FOLLOW" && "started following you"}
                                    {notification.type === "LIKE" && "liked your post"}
                                    {notification.type === "COMMENT" && "commented on your post"}
                                </p>
                                <p className="text-xs text-muted mt-1">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    </div>
  );
}
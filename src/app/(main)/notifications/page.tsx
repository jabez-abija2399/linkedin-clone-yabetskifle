import { getNotifications, markAsRead } from "@/server/actions/notification.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, UserPlus } from "lucide-react";
import Image from "next/image";
import NotificationItem from "@/components/notifications/NotificationItem";

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
                        <div className="p-8 text-center text-muted">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-muted rounded-full">
                                    <Heart className="h-6 w-6 text-muted-foreground" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg">No notifications yet</h3>
                            <p className="mt-1 text-sm">When people interact with you, it will show up here.</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { getSuggestions } from "@/server/actions/connection.actions";

export async function Suggestions() {
    const suggestions = await getSuggestions();

    if (suggestions.length === 0) return null;

    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-4">Add to your feed</h3>
                <div className="space-y-4">
                    {suggestions.map((user) => (
                        <div key={user.id} className="flex gap-3 items-center text-sm">
                            <div className="h-10 w-10 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                                {user.image ? (
                                    <Image src={user.image} alt={user.name || ""} fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center font-bold text-gray-500">
                                        {user.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <Link href={`/profile/${user.id}`} className="font-semibold hover:underline block truncate">
                                    {user.name}
                                </Link>
                                <p className="text-xs text-muted truncate">
                                    {user.headline || "LinkedIn User"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

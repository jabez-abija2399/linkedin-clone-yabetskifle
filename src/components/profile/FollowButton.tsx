"use client"

import { useState } from "react";
import Button from "@/components/ui/Button";
import { toggleFollow } from "@/server/actions/connection.actions";
import { toast } from "sonner";
import { UserPlus, UserMinus } from "lucide-react";

interface FollowButtonProps {
  targetUserId: string;
  initialIsFollowing: boolean;
}

export function FollowButton({ targetUserId, initialIsFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFollow = async () => {
    setIsLoading(true);
    
    // Optimistic update
    setIsFollowing(!isFollowing);

    const result = await toggleFollow(targetUserId);
    
    setIsLoading(false);

    if (result.error) {
      // Revert on error
      setIsFollowing(isFollowing);
      toast.error(result.error);
    } else {
      toast.success(
        result.action === "followed" 
          ? "You are now following this user" 
          : "You unfollowed this user"
      );
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "primary"}
      className="rounded-full"
    >
      {isFollowing ? (
        <>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  );
}
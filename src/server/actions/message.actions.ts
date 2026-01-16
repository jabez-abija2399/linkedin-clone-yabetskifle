"user server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { includes } from "zod"


// start a new conversation or get existing one
export async function getOrCreateConversation(otherUserId:string) {
    const session = await auth()
    if(!session?.user){
        throw new Error("Unauthorized")
    }

    try {
        // search for existing conversation b/n two users
        // the query finds a conversation where both user are participats
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                AND: [
                    {users: {some: {id:session.user.id}}},
                    {users: {some: {id:otherUserId}}}
                ],
            },
            include: {
                messages:{
                    orderBy: {createdAt: "asc"},
                    include: {sender: true}
                },
                users: true
            }
        });

        if(existingConversation) {
            return {conversation: existingConversation}
        }

        // if not found, create a new one
        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect:[
                        {id: session.user.id},
                        {id: otherUserId}
                    ]
                }
            },
            include: {
                messages: true,
                users: true
            },
        });

        return {conversation: newConversation}

        
    } catch (error) {
        return {error: "Failed to create conversation"};
    }
}

// send a message
export async function sendMessage(conversationId:string, content:string) {
    const session = await auth()
    if(!session?.user){
        throw new Error("Unauthorized")
    }

    try {
        const message = await prisma.message.create({
            data: {
                content,
                conversationId,
                senderId: session.user.id || ""
            }
        })

        // update conversation timestamp so it move to top of list 
        await prisma.conversation.update({
            where: {id: conversationId},
            data: {updatedAt: new Date()}
        })

        revalidatePath("/messaging")
        return {return: true,message}
    } catch (error) {
        return {error: "Failed to send message"}
    }
}

// Get all conversations for the current user (for the Sidebar)
export async function getUserConversations() {
    const session = await auth();
    if (!session?.user) return [];
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                users: { some: { id: session.user.id } },
            },
            include: {
                users: true, // we need this to show name/avatar of the other person
                messages: {
                    take: 1, // just get the last message for preview
                    orderBy: { createdAt: "desc" },
                },
            },
            orderBy: { updatedAt: "desc" },
        });
        return conversations;
    } catch (error) {
        return [];
    }
}
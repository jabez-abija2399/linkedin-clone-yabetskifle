This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


🚀 Next Milestones Available:
A) Connections System 🤝

Follow/unfollow users
See connection count on profiles
"People you may know" suggestions
Filter feed to show only connections' posts
B) Notifications 🔔

Real-time alerts for likes/comments
Notification badge in navbar
Mark as read functionality
Notification center page
C) Search Functionality 🔍

Search for users by name
Search posts by content
Filter and sort results
Recent searches
D) Messaging System 💬

Direct messages between users
Real-time chat with WebSockets
Message threads
Unread message count

Option 2: Add More Features
Continue building to make it even more like LinkedIn:

A) Connections System 🤝
Follow/unfollow users
See follower/following counts
"People you may know" suggestions
Filter feed to show only connections' posts
B) Notifications 🔔
Real-time alerts for likes/comments
Notification badge in navbar
Notification center page
Mark as read functionality
C) Search 🔍
Search users by name
Search posts by keywords
Filter results
Search history
D) Messaging 💬
Direct messages between users
Real-time chat
Message threads
Unread count badge

1. 🌟 Experience & Skills Section (The "CRUD" Showcase)
Why: Shows you can manage complex relational data (User -> One-to-Many -> Experiences).
Tech: Prisma Relations, Server Actions, Dynamic Forms.
Status: Not started.
2. 💬 Real-Time Messaging (The "Hard" Feature)
Why: "Real-time" is the buzzword that impresses interviewers. It shows you understand sync vs async.
Impl: Use database polling (easy) or Pusher/Socket.io (harder/better).
Status: Not started.
3. 📱 Mobile Responsiveness & Polish (The "Eye" Test)
Why: If it looks broken on a phone, they close the tab.
Impl: Check every page on mobile view. Add a bottom navigation bar for mobile (like Instagram/LinkedIn app).
Status: Partial. Search looks good on mobile, but check Profile/Navbar.
4. 🦾 AI Resume/Bio Generator (The "Trending" Feature)
Why: AI integration is hot.
Impl: Add a "Magic Button" in the Edit Profile modal that uses OpenAI (or Gemini) to "Rewrite my Bio" based on my headline.
Status: Not started.
import { prisma } from "./prisma";

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "test1@gmail.com" },
        update: {},
        create: {
            name: "Test User 1",
            email: "test1@gmail.com",
            headline: "Software Engineer",
        },
    });
    console.log("SUCCESS! User ID to use in post.actions.ts:", user.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
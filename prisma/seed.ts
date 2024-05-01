import { prisma } from "../src/lib/prisma";

async function seed() {
    await prisma.event.create({
        data: {
            id: '9e1b3b3b-3b1b-4b1b-9b3b-3b1b3b1b3b1b',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs apaixonados por tecnologia',
            maximumAttendees: 120,
        }
    })
}


seed().then(() => {
    console.log('Database seeded');
    prisma.$disconnect();
})

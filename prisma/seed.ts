import {prisma} from "@/lib/prisma.js";

async function main() {
  await prisma.review.createMany({
    data: [
      { stars: 5, content: "OK" },
      { stars: 4, content: "ok" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
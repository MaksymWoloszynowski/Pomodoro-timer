"use server"

import {prisma} from "@/lib/prisma.js";
import { revalidatePath } from "next/cache";

export async function addReview(rating: number, review: string) {
    await prisma.review.create({
        data: {
            content: review,
            stars: rating,
        },
    });

    revalidatePath("/reviews")
}
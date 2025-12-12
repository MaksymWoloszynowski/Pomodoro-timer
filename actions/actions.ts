"use server"

import {prisma} from "@/lib/prisma";

export async function addReview(rating: number, review: string) {
    await prisma.review.create({
        data: {
            content: review,
            stars: rating,
        },
    });
}
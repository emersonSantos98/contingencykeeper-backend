import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {prisma} from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/events/:eventId/attendees', {
            schema: {
                summary: 'Get event attendee',
                tags: ['Events'],
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                querystring: z.object({
                    pageIndex: z.string().nullish().default('0').transform(Number),
                    query: z.string().nullish()
                }),
                response: {
                    200: z.object({
                        attendees: z.array(
                            z.object({
                                id: z.number(),
                                name: z.string(),
                                email: z.string(),
                                createdAt: z.date(),
                                checkInAt: z.date().nullable()
                            })
                        ),
                        total: z.number()
                    })
                }
            }
        }, async (request, reply) => {
            const {eventId} = request.params;
            const {pageIndex, query} = request.query;

            const attendees = await prisma.attendee.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    checkIns: {
                        select: {
                            createdAt: true,
                        }
                    }
                },
                where: query ? {
                    eventId,
                    name: {
                        contains: query
                    }
                } : {
                    eventId,
                },
                take: 10,
                skip: pageIndex * 10,
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return reply.send({
                attendees: attendees.map(attendee => ({
                    id: attendee.id,
                    name: attendee.name,
                    email: attendee.email,
                    createdAt: attendee.createdAt,
                    checkInAt: attendee.checkIns?.createdAt ?? null
                })),
                total: await prisma.attendee.count({
                    where: {
                        eventId,
                    }
                })
            });
        })
}

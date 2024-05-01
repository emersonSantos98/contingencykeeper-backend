import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {prisma} from "../../lib/prisma";
import {BadRequest} from "../_errors/bad-request";
import {lookup} from 'geoip-lite';

export async function listUsers(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/users', {
                schema: {
                    summary: 'List a user',
                    tags: ['Users'],
                    response: {
                        201: z.object({
                            users: z.array(
                                z.object({
                                    id: z.number(),
                                    name: z.string(),
                                    currency: z.string(),
                                    email: z.string().email(),
                                    createdAt: z.date(),
                                })
                            ),
                            total: z.number(),
                        }),
                        409: z.object({
                            message: z.string(),
                        }),
                    }
                }
            }, async (request, reply) => {
                const geoip = lookup(request.ip)
                console.log('Geoip', geoip)

                const userList = await prisma.user.findMany({
                    select:{
                        id: true,
                        name: true,
                        email: true,
                        currency: true,
                        createdAt: true,
                    }
                })

                const countUsers = await prisma.user.count()

                return reply.status(201).send({
                    users: userList,
                    total: countUsers,
                });
            }
        )
}

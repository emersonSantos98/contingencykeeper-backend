import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {prisma} from "../../lib/prisma";
import {BadRequest} from "../_errors/bad-request";
import {lookup} from 'geoip-lite';

export async function createUser(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/users', {
                schema: {
                    summary: 'Create a user',
                    tags: ['Users'],
                    body: z.object({
                        name: z.string().min(3).max(255),
                        email: z.string().email(),
                        password: z.string().min(6).max(255),
                    }),
                    response: {
                        201: z.null(),
                        409: z.object({
                            message: z.string(),
                        }),
                    }
                }
            }, async (request, reply) => {
                console.log('Creating user', request.ip)
                const geoip = lookup(request.ip)
                console.log('Geoip', geoip)
                const {email, password, name} = request.body;

                const emailUserExist = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (emailUserExist !== null) {
                    throw new BadRequest('User already exists')
                }

                await prisma.user.create({
                    data: {
                        email,
                        password,
                        name,
                        roleId: 1,
                        currency: 'BRL',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });

                return reply.status(201).send();
            }
        )
}

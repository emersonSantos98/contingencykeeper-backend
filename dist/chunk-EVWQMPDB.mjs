import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register an attendee",
      tags: ["Attendees"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        }),
        400: z.object({
          success: z.literal(false),
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeeExists = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (attendeeExists !== null) {
      throw new BadRequest("This e-mail is aleady registered for this event");
    }
    const [event, amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
      return reply.status(400).send({
        success: false,
        error: "The maximum number of attendees has been reached."
      });
    }
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  registerForEvent
};

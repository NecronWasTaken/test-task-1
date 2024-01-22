import { z } from "zod";
import { Request, Response } from "express";
import type { User } from "@/shared/types";
import { AppError } from "@/app/error.handler"
import { eventEmitter } from '@/shared/event.helper'
import crypto from 'crypto'

type ResponseBody = User[];
type Pull = {
  key: string
}
const db: User[] = [
  {
    email: "jim@gmail.com",
    number: "221122",
  },
  {
    email: "jam@gmail.com",
    number: "830347",
  },
  {
    email: "john@gmail.com",
    number: "221122",
  },
  {
    email: "jams@gmail.com",
    number: "349425",
  },
  {
    email: "jams@gmail.com",
    number: "141424",
  },
  {
    email: "jill@gmail.com",
    number: "822287",
  },
  {
    email: "jill@gmail.com",
    number: "822286",
  },
];

function validate(req: Request) {
  console.log("[REQ QUERY]", req.query);
  
  const schema = z.object({
    email: z.string().email(),
    number: z.string().refine((value) => /^\d{6}$/.test(value)).optional()
  });
  const res = schema.safeParse(req.query)
  
  return res.success ? res.data : undefined;
}

let pull: Set<string> = new Set()

async function getUser(req: Request, res: Response<ResponseBody>) {
  const data = req.method + req.path + req.headers.origin + req.headers.host
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const key = hash.digest('hex');
  
  if (pull.has(key)) {
    eventEmitter.emit(key, "Request aborted")
    console.log('[EVENT EMMITER] Aborting current request');
  }
  pull.add(key)

  function delay(req: Request) {
    return new Promise<User[] | AppError>(async (resolve, reject) => {
    eventEmitter.once(key, () => resolve(new AppError("Bad data")))
      setTimeout(() => {
        const user = validate(req);
        if (!user) return resolve(new AppError("Bad data"))
        console.log("[USER]", user);

        const matchingUsers = db.filter((dbUser) => {
          return dbUser.email === user.email &&
            (user.number === undefined || dbUser.number === user.number);
        });
        console.log("[MATCHING USERS]", matchingUsers);
        
        resolve(matchingUsers);
      }, 5000);
    });
  }

  await delay(req)
    .then((value) => {
      pull.delete(key)
      console.log("[PULL]", pull);
      
      if (value instanceof AppError) throw value
      else {
        console.log("[VALUE]", value); 
        res.send(value);
      }
    })
}

export default getUser;
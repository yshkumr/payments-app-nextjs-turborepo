import dotenv from "dotenv";
import prisma from "@repo/db/clients";
import express from "express";
import z from "zod";
import cors from "cors";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const dataCheck = z.object({
  token: z.string(),
  userId: z.string(),
  amount: z.number(),
});

type Data = z.infer<typeof dataCheck>;

app.post("/bankWebhook", async (req, res) => {
  const validData = dataCheck.safeParse(req.body);

  const bankSecret = req.headers["secret"];

  if (bankSecret !== process.env.BANK_SECRET) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (!validData.success) {
    return res.status(400).json({
      error: "Invalid Data",
    });
  }

  const { token, userId, amount }: Data = req.body;

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      }),

      prisma.onRampTxn.update({
        where: {
          token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Error while processing request",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Running at PORT ${PORT}`);
});

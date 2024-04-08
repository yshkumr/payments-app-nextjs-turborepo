import { Card } from "@repo/ui/card";

type SentTxn = {
  id: string;
  amount: number;
  createdAt: Date;
  fromUserId: string;
  toUserId: string;
};

export const SentTxnComp = async ({ sentTxns }: { sentTxns: SentTxn[] }) => {
  return (
    <Card
      title="Received"
      className={"border w-1/3 border-black p-4 rounded-md"}
    >
      <div className="mt-2 flex flex-col gap-2">
        {sentTxns
          .reverse()
          .slice(0, 7)
          .map((t) => (
            <div className="flex justify-between" key={t.id}>
              <div>
                <div className="text-sm">INR</div>
                <div className="text-slate-600 text-xs">
                  <p>{t.createdAt.toDateString()}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end text-red-600 font-medium">
                - Rs {t.amount / 100}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

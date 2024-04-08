import { Card } from "@repo/ui/card";

export const OnRampTxns = ({
  transactions,
}: {
  transactions: {
    createdAt: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card
        title="Recent Transactions"
        className={"border border-black p-4 rounded-md"}
      >
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Added" className={"border border-black p-4 rounded-md"}>
      <div className="pt-2 flex flex-col gap-2">
        {transactions.map((t, index) => (
          <div className="flex justify-between" key={index}>
            <div>
              <div className="text-sm">INR</div>
              <div className="text-slate-600 text-xs">
                <p>{t.createdAt.toDateString()}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center text-green-600 font-medium">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

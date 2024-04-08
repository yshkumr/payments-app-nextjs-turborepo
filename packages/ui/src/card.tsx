export function Card({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className: any;
}): JSX.Element {
  return (
    <div className={className}>
      <h1 className="text-lg border-b pb-2 font-bold text-center">{title}</h1>
      <div>{children}</div>
    </div>
  );
}

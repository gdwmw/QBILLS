import { FC, ReactElement, ReactNode } from "react";

type T = {
  children: ReactNode;
  maxWidth: number;
  onSubmit: (e: any) => any;
  title: string;
};

export const Modal: FC<T> = ({ children, maxWidth, onSubmit, title }): ReactElement => {
  return (
    <section className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-N7/30 px-5 backdrop-blur-sm">
      <form className="h-fit w-full rounded-xl bg-N1 p-5 shadow-md" onSubmit={onSubmit} style={{ maxWidth: `${maxWidth}px` }}>
        <div className="flex size-full flex-col items-center gap-3 rounded-lg border p-5">
          <h1 className="text-center text-2xl font-bold">{title}</h1>
          {children}
        </div>
      </form>
    </section>
  );
};

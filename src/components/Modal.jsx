import { Button } from "./Button";

export const Modal = (props) => {
  const { isOpen, setIsOpen, children, title } = props;

  return (
    isOpen && (
      <>
        <div
          className="min-h-[100vh] min-w-[100vw] opacity-10 bg-amber-950 z-10 fixed top-0 left-0"
          onClick={() => setIsOpen(false)}
        />
        <div className="z-20 bg-amber-50 p-8 w-[80vw] fixed top-[10vw] left-[10vw]">
          <div className="flex justify-between">
            <div className="w-3" />
            <div className="text-xl font-bold">{title}</div>
            <Button onClick={() => setIsOpen(false)}>back</Button>
          </div>
          {children}
        </div>
      </>
    )
  );
};

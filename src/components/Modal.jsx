import { useCallback } from "react";
import { Button } from "./Button";

export const Modal = (props) => {
  const { isOpen, setIsOpen, children, title, isEvil } = props;

  /*
    Wahahaha
    If the modal is evil
    it shall not close
    until the user does the thing
  */
  const clickFunction = useCallback(() => {
    if (!isEvil) {
      setIsOpen(false);
    }
  }, [isEvil, setIsOpen]);

  return (
    isOpen && (
      <>
        <div
          className="min-h-[100vh] min-w-[100vw] opacity-10 bg-amber-950 z-10 fixed top-0 left-0"
          onClick={clickFunction}
        />
        <div className="z-20 bg-amber-50 p-8 w-[80vw] fixed top-[5vw] left-[10vw] overflow-auto max-h-[90vh]">
          <div className="DisplayFont flex justify-between">
            <div className="w-3" />
            <div className="text-2xl font-bold mb-8">{title}</div>
            {isEvil ? (
              <div className="w-3" />
            ) : (
              <Button onClick={() => setIsOpen(false)}>back</Button>
            )}
          </div>
          {children}
        </div>
      </>
    )
  );
};

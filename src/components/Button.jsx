export const Button = (props) => {
  const { children, onClick, centerText = false } = props;
  return (
    <div
      onClick={onClick}
      className={`font-bold cursor-pointer ${centerText ? "text-center" : ""}`}
    >
      {children}
    </div>
  );
};

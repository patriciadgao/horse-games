export const Button = (props) => {
  const { children, onClick, centerText = false, fontStyle = "" } = props;
  return (
    <div
      onClick={onClick}
      className={`font-bold cursor-pointer ${centerText ? "text-center" : ""} ${fontStyle}`}
    >
      {children}
    </div>
  );
};

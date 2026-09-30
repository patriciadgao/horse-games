export const Button = (props) => {
  const { children, onClick } = props;
  return (
    <div onClick={props.onClick} className="font-bold cursor-pointer">
      {children}{" "}
    </div>
  );
};

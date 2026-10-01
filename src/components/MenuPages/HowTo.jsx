import { Apple, Hat, Horse } from "../HorseArea";
import { Modal } from "../Modal";

export const HowTo = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="how to">
      <div className="text-left space-y-4">
        <p>Welcome to Horse Game.</p>
        <p>Each week you start with a horse. Here's an example:</p>
        <div className="flex justify-center">
          <Horse
            horse={{
              shape: ["S", "S", "S"],
              color: "tan",
              expression: "neutral",
              spots: ["O", "O"],
            }}
          />
        </div>
        <p>Aww, so cute!</p>
        <p>
          This horse has a few attributes: color, shape, expression, and
          spotted-ness. It can also acquire a hat or a number of apples.
        </p>
        <div className="flex justify-center space-x-4 items-center">
          <Hat hat="bowler" />
          <Apple />
          <Apple />
          <Apple />
        </div>
        <p>
          Each <i>day</i> you will have a choice between two other horses.
        </p>
        <div className="flex justify-center items-center align-baseline space-x-8">
          <Horse
            horse={{
              shape: ["T", "T", "T"],
              color: "blue",
              expression: "smile",
              spots: ["O", "o"],
            }}
          />
          <Horse
            horse={{
              shape: ["R", "R", "R"],
              color: "pink",
              expression: "neutral",
              spots: ["O", "O"],
              apples: 1,
              hat: "boss-of-the-plains",
            }}
          />
        </div>
        <p>
          This horse will "merge" with your horse, changing its attributes. (Idk
          I wasn't really thinking about horses mating or whatever when I came
          up with this concept. I still want you to be able to name each week's
          horse eventually so consider it the same horse.)
        </p>
        <p>
          Your goal each week will be to achieve as many of three goals as you
          can. You will get points for each goal you achieve!
        </p>
      </div>
    </Modal>
  );
};

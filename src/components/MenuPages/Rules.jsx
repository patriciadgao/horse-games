import { Apple, Horse } from "../HorseArea";
import { Modal } from "../Modal";

export const Rules = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="rules">
      <div className="text-left space-y-8">
        <p>These are the rules of horse merging!</p>
        <Section heading="shape">
          <p>
            Each horse has three shape genes with names R, S, and T. (R for
            round, S for square, and T for tall.) If a horse has mostly one gene
            (for example, two Rs and one S) it will be the shape corresponding
            to that letter.
          </p>
          <p>If a horse has one of each gene, it will be short.</p>
          <div className="flex items-baseline">
            <Horse
              horse={{
                shape: ["R", "R", "R"],
                color: "tan",
                expression: "neutral",
                spots: ["o", "o"],
              }}
              small
              showAppleBox={false}
            />
            <Horse
              horse={{
                shape: ["S", "S", "S"],
                color: "tan",
                expression: "neutral",
                spots: ["o", "o"],
              }}
              small
              showAppleBox={false}
            />
            <Horse
              horse={{
                shape: ["T", "T", "T"],
                color: "tan",
                expression: "neutral",
                spots: ["o", "o"],
              }}
              small
              showAppleBox={false}
            />
            <Horse
              horse={{
                shape: ["R", "S", "T"],
                color: "tan",
                expression: "neutral",
                spots: ["o", "o"],
              }}
              small
              showAppleBox={false}
            />
          </div>
        </Section>
        <Section heading="color">
          <p>
            A horse retains its color after a merge, unless it’s merged with a
            horse of the same color. Then it <i>will</i> change to a different
            color.
          </p>
        </Section>
        <Section heading="spots">
          <p>
            A horse has two spot genes: O and o. If it’s OO, it will have one
            big spot. If it's Oo, it will be speckled. If it's oo, it will be
            plain.
          </p>
          <div className="flex items-baseline">
            <Horse
              horse={{
                shape: ["R", "S", "T"],
                color: "blue",
                expression: "neutral",
                spots: ["O", "O"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
            <Horse
              horse={{
                shape: ["R", "S", "T"],
                color: "blue",
                expression: "neutral",
                spots: ["O", "o"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
            <Horse
              horse={{
                shape: ["R", "S", "T"],
                color: "blue",
                expression: "neutral",
                spots: ["o", "o"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
          </div>
        </Section>
        <Section heading="expression">
          <p>
            A horse’s expression follows its shape. If a horse changes shape, it
            will change to the expression of the horse it got its shape from.
            (If two horses merge and the new shape is from neither parent, the
            horse gains a neutral expression.)
          </p>
          <p>
            The exception to this has to do with hats—if a horse gains a hat,
            it’ll start smiling ... and if it loses its hat, it’ll frown.
          </p>
          <div className="flex items-baseline">
            <Horse
              horse={{
                shape: ["R", "R", "R"],
                color: "tan",
                expression: "smile",
                spots: ["O", "O"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
            <Horse
              horse={{
                shape: ["R", "R", "R"],
                color: "tan",
                expression: "neutral",
                spots: ["O", "O"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
            <Horse
              horse={{
                shape: ["R", "R", "R"],
                color: "tan",
                expression: "frown",
                spots: ["O", "O"],
              }}
              small
              showAppleBox={false}
              tallHeight={false}
            />
          </div>
        </Section>
        <Section heading="hat">
          <p>
            Your horse has a 50% chance of stealing the hat of a horse it merges
            with. If it merges with another horse with a hat, they have a 50%
            chance of swapping hats.
          </p>
        </Section>
        <Section heading="apples">
          <p>
            Apples work in mysterious ways ... if merged with a horse with at
            least one apple, your horse will gain that number of apples.
          </p>
          <p>
            If merged with a horse with no apples, your horse has a 75% chance
            of losing an apple (because it is kind and likes to share). It has a
            25% chance of doubling its apples (possibly a thank-you from the
            apple fairy).
          </p>
          <div className="flex items-baseline">
            <Apple />
            <Apple />
            <Apple />
          </div>
        </Section>
      </div>
    </Modal>
  );
};

const Section = (props) => {
  const { heading, children } = props;

  return (
    <div className="space-y-2">
      <p className="DisplayFont font-bold text-lg">{heading}</p>
      {children}
    </div>
  );
};

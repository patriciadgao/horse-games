import { Modal } from "../Modal";

export const About = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="about">
      <div className="text-left space-y-4">
        <p>
          This is “Horse Game”. It is a game designed, drawn, and programmed by
          me, AKA a girl named Pat. I think I might have come up with it in the
          shower.
        </p>
        <p>
          The ultimate dream for this page (which is why the URL contains horse
          games <i>plural</i>) is for it to contain many horse games!
        </p>
        <p>
          If you find bugs or want to talk about how awesome this game is,
          please send me a message on Instagram @nopatnocomics or a text or an
          email if you happen to have my information for those.
        </p>
      </div>
    </Modal>
  );
};

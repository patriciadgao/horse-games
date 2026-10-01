import { Modal } from "../Modal";

export const About = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="about">
      <div className="text-left space-y-4">
        <p>
          This is "Horse Game". It is a game designed, drawn, and programmed by
          a girl named Pat. She conceived of it in the shower, probably.{" "}
        </p>
        <p>
          The ultimate dream for this page (which is why the URL contains horse
          games <i>plural</i>) is for it to contain many horse games—24, in
          fact—that are all meant to give you practice at some habit that is
          good for you.
        </p>
        <p>
          If you find bugs or want to talk about how awesome this game is,
          please send her a message on Instagram @nopatnocomics or a text or an
          email if you happen to have those.
        </p>
      </div>
    </Modal>
  );
};

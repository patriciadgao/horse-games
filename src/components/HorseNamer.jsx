import { Horse } from "./HorseArea";
import { Modal } from "./Modal";

export const HorseNamer = (props) => {
  const { isOpen, setIsOpen, currentHorse, onSetHorseName } = props;

  function nameHorse(formData) {
    const name = formData.get("horseName");
    const currentHorse = JSON.parse(localStorage.getItem("current_horse"));
    currentHorse.name = name;
    localStorage.setItem("current_horse", currentHorse);
    onSetHorseName(name);
    setIsOpen(false);
  }

  return (
    <Modal isEvil isOpen={isOpen} setIsOpen={setIsOpen} title="name your horse">
      <Horse
        horse={currentHorse}
        showAppleBox={
          currentHorse && (currentHorse.apples > 0 || currentHorse.hat)
        }
      />
      <form action={nameHorse}>
        <div>
          <input
            className="text-center w-44 p-2 my-2 border-black border-solid border-2 rounded-xl focus:outline-none"
            name="horseName"
            maxLength={15}
          />
        </div>
        <div>
          <button type="submit" className="SpecialButton">
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

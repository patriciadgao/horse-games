import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const [isStableOpen, setIsStableOpen] = useState(false);
  const [isLineageOpen, setIsLineageOpen] = useState(false);

  return (
    <>
      <div className="fixed top-12 right-8">
        <div className="flex flex-col gap-2 text-right w-24 cursor-pointer">
          <Button onClick={() => setIsOpen(!isOpen)}>what?</Button>
          <WhatItem
            text="how to"
            isOpen={isOpen}
            onClick={() => setIsHowToOpen(true)}
          />
          <WhatItem
            text="stable"
            isOpen={isOpen}
            onClick={() => setIsStableOpen(true)}
          />
          <WhatItem
            text="lineage"
            isOpen={isOpen}
            onClick={() => setIsLineageOpen(true)}
          />
          <WhatItem
            text="about"
            isOpen={isOpen}
            onClick={() => setIsAboutOpen(true)}
          />
        </div>
      </div>
      <HowTo isOpen={isHowToOpen} setIsOpen={setIsHowToOpen} />
      <Stable isOpen={isStableOpen} setIsOpen={setIsStableOpen} />
      <Lineage isOpen={isLineageOpen} setIsOpen={setIsLineageOpen} />
      <About isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} />
    </>
  );
};

const WhatItem = (props) => {
  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${props.isOpen ? "opacity-60" : "opacity-0 hidden"} hover:opacity-100`}
    >
      <Button onClick={props.onClick}>{props.text}</Button>
    </div>
  );
};

const HowTo = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="how to">
      Hello world!
    </Modal>
  );
};

const Stable = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="stable">
      Hello world!
    </Modal>
  );
};

const Lineage = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="lineage">
      Hello world!
    </Modal>
  );
};

const About = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="about">
      Hello world!
    </Modal>
  );
};

import { useState } from "react";
import { Button } from "./Button";
import { About } from "./MenuPages/About";
import { HowTo } from "./MenuPages/HowTo";
import { Lineage } from "./MenuPages/Lineage";
import { Stable } from "./MenuPages/Stable";

export const Menu = (props) => {
  const { needsRefresh, setNeedsRefresh } = props;
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
      <Stable
        isOpen={isStableOpen}
        setIsOpen={setIsStableOpen}
        setNeedsRefresh={setNeedsRefresh}
      />
      <Lineage
        isOpen={isLineageOpen}
        setIsOpen={setIsLineageOpen}
        needsRefresh={needsRefresh}
      />
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

import { useCallback, useEffect, useState } from "react";
import { horses } from "../../utils/horseBasics";
import { refreshGameStatus } from "../../utils/horseGameFunctions";
import { clearStable, getStableInfo } from "../../utils/horseStorageFunctions";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const Stable = (props) => {
  const { isOpen, setIsOpen, setNeedsRefresh } = props;
  const [isConfirming, setIsConfirming] = useState(false);
  const [stableInfo, setStableInfo] = useState(getStableInfo());

  useEffect(() => {
    setStableInfo(getStableInfo());
  }, [isOpen]);

  const resetStable = useCallback(() => {
    clearStable();
    refreshGameStatus();
    setIsConfirming(false);
    setNeedsRefresh(true);
    setStableInfo(getStableInfo());
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="stable">
      <div className="text-md text-left">
        <div className="font-bold text-lg">Your achievements:</div>
        <div>{`horse types: ${stableInfo.achievedHorses}/${horses.length} (${Math.round((stableInfo.achievedHorses * 100) / horses.length)}%)`}</div>
        <div>{`hat types: ${stableInfo.achievedHats}/4`}</div>
        <div>{`max apples: ${stableInfo.maxApples}`}</div>
        {stableInfo.missingHorse && (
          <div>
            <div>A horse you're missing:</div>
            <div className="mt-2 w-[150px] flex items-center flex-col gap-2">
              <img
                src={require(`../../img/${stableInfo.missingHorse}.png`)}
                alt={stableInfo.missingHorse}
              />
            </div>
          </div>
        )}
        <div className="mt-12 text-right">
          <Button onClick={() => setIsConfirming(true)}>reset my stats</Button>
        </div>
      </div>
      <Modal
        isOpen={isConfirming}
        setIsOpen={setIsConfirming}
        title="are you sure?"
      >
        <Button onClick={resetStable}>yes</Button>
      </Modal>
    </Modal>
  );
};

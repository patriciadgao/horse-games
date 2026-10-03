import { Modal } from "../Modal";

export const Faq = (props) => {
  const { isOpen, setIsOpen } = props;
  const faqs = [
    {
      question: "I missed a day! What do I do?",
      answer:
        "During each week, you can make catch-up choices up to today. However, once the Sunday (last day of that week) has passed, there’s no way to make it up. Enjoy this week’s challenge instead.",
    },
    {
      question: "Can I save my progress?",
      answer:
        "Your progress is automatically saved in your browser. Right now there is not a way to save progress across devices.",
    },
    {
      question: "Can I clear my progress?",
      answer:
        "Yep! Go to the stable, there is an option there to reset everything. However ... that gets rid of ALL previous weeks’ data, not just this one.",
    },
    {
      question: "Does this game collect any of my personal information?",
      answer:
        "Nope! Everything it stores (which is just your choices / horses) stays local to you. It does not travel into “the cloud”, it does not pass GO, it does not collect $200.",
    },
    {
      question: "I clicked the wrong horse! Can I undo my choice?",
      answer:
        "Nah. Better luck next time. This game is also not that big of a deal.",
    },
    {
      question:
        "How do I know what will happen to my horse when it merges with another one?",
      answer:
        "You can read the source code if you want, but I suggest you figure it out yourself by slowly learning the rules. It seems kinda fun that way.",
    },
    {
      question: "Is my horse happy?",
      answer: "Yes.",
    },
    {
      question: "Really?",
      answer: "Well, maybe not if its hat just got stolen.",
    },
    {
      question: "My horse has a hat. Why isn’t it wearing the hat?",
      answer: "Have you ever seen a horse put on a hat?",
    },
    {
      question: "Why do my horse’s apples keep changing?",
      answer: "Apples are mysterious things.",
    },
    {
      question: "When was Horse Game created?",
      answer: "At the end of September in 2026.",
    },
    {
      question: "Will this game ever end?",
      answer:
        "Horse Game is currently on a demo run until January 10, 2027. If you like it, or if you hate it, please send me a message!",
    },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="fun awesome questions">
      <div className="text-left space-y-4">
        {faqs.map((q) => {
          return (
            <Question
              key={q.question}
              question={q.question}
              answer={q.answer}
            />
          );
        })}
      </div>
    </Modal>
  );
};

const Question = (props) => {
  const { question, answer } = props;

  return (
    <div>
      <p className="DisplayFont font-bold text-lg">{question}</p>
      <p>{answer}</p>
    </div>
  );
};

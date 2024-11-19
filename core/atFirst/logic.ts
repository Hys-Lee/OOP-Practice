// Refree Logic

const strikeLogic = ({ input, answer }) => {
  return input.filter((value, idx) => answer[idx] === value); // answer랑 같은 위치에서 값이 같
};

const ballLogic = ({ input, answer }) => {
  return input.filter(
    (value, idx) =>
      answer.find((answerV) => answerV == value) && answer[idx] != value // 존재하나, 일치X
  );
};

// Guard Logic
const typeGuardLogic = ({ input }) => {
  console.log('typeg: ', input);
  if (!Array.isArray(input)) return false;
  return input.every(
    (number) => !Number.isNaN(number) && Number.isInteger(number)
  );
};

const lenGuradLogic = ({ input, answer }) => {
  if (answer.length === input.length) return true;
  return false;
};

const phaseGuardLogic = ({ phase }) => {
  if (phase > 3) return false;
  return true;
};

export {
  strikeLogic,
  ballLogic,
  typeGuardLogic,
  lenGuradLogic,
  phaseGuardLogic,
};

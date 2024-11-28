import connectFormToDirectUse from './directUse/connectToView';

const root = document.getElementById('root');

const creatInputComponent = () => {
  const inputEle = document.createElement('input');
  inputEle.type = 'number';
  inputEle.name = 'input';
  inputEle.maxLength = 3;
  inputEle.minLength = 3;

  return inputEle;
};
const createButton = ({
  name,
  title,
  onCLick,
}: {
  name: string;
  title: string;
  onCLick?: (event: Event) => void;
}) => {
  const button = document.createElement('button');
  button.type = 'submit';
  button.name = name;
  button.innerHTML = `${title}`;
  return button;
};

const createButtonWrap = () => {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.flexDirection = 'row';

  const rebootBtn = createButton({ name: 'reboot', title: '재시작' });
  const proceedBtn = createButton({ name: 'proceed', title: '진행' });
  const endBtn = createButton({ name: 'end', title: '종료' });
  wrapper.appendChild(rebootBtn);
  wrapper.appendChild(proceedBtn);
  wrapper.appendChild(endBtn);

  return wrapper;
};

const createForm = (elementsInOrder: HTMLElement[]) => {
  const form = document.createElement('form');
  connectFormToDirectUse(form);

  const p = document.createElement('p');
  p.id = 'answer';
  [...elementsInOrder, p].forEach((ele) => form.appendChild(ele));

  return form;
};

const makeGameComponents = () => {
  const defaultInput = creatInputComponent();
  const buttons = createButtonWrap();
  const form = createForm([defaultInput, buttons]);
  return form;
};

const baseballViewer = makeGameComponents();

root?.appendChild(baseballViewer);

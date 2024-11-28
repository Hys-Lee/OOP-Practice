import { proceedGameWithInput, endGame, rebootGame } from './GameInterface';
const connectFormToDirectUse = (formELe: HTMLElement) => {
  formELe.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    //     if(name=='proceed'){

    //     }

    const formData = new FormData(target);
    // console.log(
    //   'TARGET, form: ',
    //   target,
    //   formData.get('input'),
    //   event.submitter.getAttribute('name')
    // );

    const buttonName = event.submitter.getAttribute('name');
    if (buttonName === 'proceed') {
      const inputString: string = formData.get('input').toString();
      const inputArr = inputString.split('').map((val) => Number(val));
      const result = proceedGameWithInput(inputArr);
      console.log('inputarr,res: ', inputArr, result);

      console.log('TAR: ', document.getElementById('answer'));
      const answer = document.getElementById('answer');
      const strike = result.pitchingResult.pitchingResult.strike;
      const ball = result.pitchingResult.pitchingResult.ball;
      const leftPhase = result.pitchingResult.leftPhase;
      const isEnd = result.pitchingResult.isEnd;
      answer.innerHTML = `스트라이크: ${strike}, 볼: ${ball}, 남은 페이즈: ${leftPhase}, 끝?: ${isEnd}`;
    } else if (buttonName === 'reboot') {
      rebootGame();
    } else if (buttonName === 'end') {
      endGame();
    } else {
      console.error('그런건 없는디요');
    }
  });
};
export default connectFormToDirectUse;

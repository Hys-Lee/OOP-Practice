import PitchingDTO from '../model/PitchingDTO/PithcingDTO';
import PitchingDTOFactory from '../model/PitchingDTO/PitchingDTOFactory';
import { BallReferee, StrikeReferee } from './SubReferee';

describe('strikeReferee테스트', () => {
  const sr = new StrikeReferee();
  const answer = new PitchingDTO([1, 2, 3]);
  test('모두 스트라이크', () => {
    const input = new PitchingDTO([1, 2, 3]);
    const result = { type: 'strike', result: 3 };
    expect(sr.judge(input, answer)).toEqual(result);
  });
  test('일부 스트라이크', () => {
    const input = new PitchingDTO([1, 2, 4]);
    const result = { type: 'strike', result: 2 };
    expect(sr.judge(input, answer)).toEqual(result);
  });
  test('노 스트라이크', () => {
    const input = new PitchingDTO([4, 5, 6]);
    const result = { type: 'strike', result: 0 };
    expect(sr.judge(input, answer)).toEqual(result);
  });
});

describe('ballReferee테스트', () => {
  const br = new BallReferee();
  const answer = new PitchingDTO([1, 2, 3, 4]);
  test('올 스트라이크, 노 볼', () => {
    const input = new PitchingDTO([1, 2, 3, 4]);
    const result = { type: 'ball', result: 0 };
    expect(br.judge(input, answer)).toEqual(result);
  });
  test('1스트라이크 1볼 4개중', () => {
    const input = new PitchingDTO([1, 3, 4, 2]);
    const result = { type: 'ball', result: 1 };
    expect(br.judge(input, answer)).toEqual(result);
  });
  test('올 볼', () => {
    const input = new PitchingDTO([4, 3, 2, 1]);
    const result = { type: 'ball', result: 4 };
    expect(br.judge(input, answer)).toEqual(result);
  });
  test('노 볼, 노 스트라이크', () => {
    const input = new PitchingDTO([5, 6, 7, 8]);
    const result = { type: 'ball', result: 0 };
    expect(br.judge(input, answer)).toEqual(result);
  });
});

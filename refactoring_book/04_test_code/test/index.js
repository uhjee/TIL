import {expect} from 'chai';
import {describe, it} from 'mocha';
import {sampleProvinceData} from '../data.js';
import {Province} from '../Province.js';

describe('province', function () {
  // 픽스처 초기화 - 각 테스트 별로 불변값을 유지하기 위해
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });


  it('shortfall', function () {
    // const asia = new Province(sampleProvinceData()); describe 함수 내 beforeEach 훅으로 이동
    expect(asia.shortfall).to.equal(5); // 검증
  });

  it('profit', function () {
    // const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  });

  it('change production', function () {
    asia.producers[0].production = 20; // 수행 of 설정-실행-검증
    expect(asia.shortfall).equal(-6); // 검증 of 설정-실행-검증
    expect(asia.profit).equal(292); // 검증 of 설정-실행-검증
  });

  it('zero demand', function () { // 수요가 없는 경우
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  it('negative demand', function () { // 수요가 음수인 경우
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  })

  it('negative demand', function () { // 수요가 nullString인 경우
    asia.demand = '';
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  })


});

describe('no producers', function () { // 생산자가 없는 경우
  let noProducers;
  beforeEach(function () {
    const data = {
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20
    };
    noProducers = new Province(data);
  })

  it('shortfall', function () {
    expect(noProducers.shortfall).equal(30);
  });
  it('profit', function () {
    expect(noProducers.profit).equal(0);
  });
});


describe('string for producers', function () { // 의도적 에러 발생
  it('', function () {
    const data = {
      name: 'String producers',
      producers: '',
      demand: 30,
      price: 20
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  })
})

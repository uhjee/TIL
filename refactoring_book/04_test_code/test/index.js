import { expect } from 'chai';
import { describe, it } from 'mocha';
import { sampleProvinceData } from '../data.js';
import { Province } from '../Province.js';

describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData()); // 픽스처 설정
    expect(asia.shortfall).to.equal(5); // 검증
  });
});

const test = require('tape')
const bca = require('./bcaCheck');

test('input 1 should be eligible', function (t) {
    const result = bca.checkBCAEligibility('./inputs/1.json');
    t.true(result);
    t.end();
  });

  test('input 2 should be eligible', function (t) {
    const result = bca.checkBCAEligibility('./inputs/2.json');
    t.true(result);
    t.end();
  });

  test('input 3 should not be eligible due being operating by only 12 months and needed more that 12', function (t) {
    const result = bca.checkBCAEligibility('./inputs/3.json');
    t.false(result);
    t.end();
  });

  test('input 4 should not be eligible due months without transactions (2017-9 and 2017-8)', function (t) {
    const result = bca.checkBCAEligibility('./inputs/4.json');
    t.false(result);
    t.end();
  });

  test('input 5 should not be eligible due months average under requested amount', function (t) {
    const result = bca.checkBCAEligibility('./inputs/5.json');
    t.false(result);
    t.end();
  });

  test('input 6 should be eligible', function (t) {
    const result = bca.checkBCAEligibility('./inputs/6.json');
    t.true(result);
    t.end();
  });

  test('input 7 should not be eligible due months average under requested amount', function (t) {
    const result = bca.checkBCAEligibility('./inputs/7.json');
    t.false(result);
    t.end();
  });

  test('input 8 should not be eligible due requested amount greater than 50.000', function (t) {
    const result = bca.checkBCAEligibility('./inputs/8.json');
    t.false(result);
    t.end();
  });

  test('input 9 should not be eligible due requested amount less than 5.000', function (t) {
    const result = bca.checkBCAEligibility('./inputs/9.json');
    t.false(result);
    t.end();
  });

  test('input 10 should be eligible due requested is above 25000 and has transaction data for 14 months', function (t) {
    const result = bca.checkBCAEligibility('./inputs/10.json');
    t.true(result);
    t.end();
  });

  test('input 11 should not be eligible due requested is above 25000 and not every month has data', function (t) {
    const result = bca.checkBCAEligibility('./inputs/11.json');
    t.false(result);
    t.end();
  });

  test('input 12 should not be eligible due requested is above 25000 and there is no transaction data for more than 12 months', function (t) {
    const result = bca.checkBCAEligibility('./inputs/12.json');
    t.false(result);
    t.end();
  });

  test('input 13 should not be eligible due being operating by only 12 months and needed more that 12', function (t) {
    const result = bca.checkBCAEligibility('./inputs/13.json');
    t.false(result);
    t.end();
  });
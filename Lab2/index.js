const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

//average
try {
    // Should Pass
    const averageOne = arrayUtils.average([[1],[2],[3]]);
    console.log('average passed successfully');
 } catch (e) {
    console.error('average failed test case');
 }
 try {
    // Should Fail
    const averageTwo = arrayUtils.average([[1],[2],[]]);
    console.error('average did not error');
 } catch (e) {
    console.log('average failed successfully');
 }

//modeSquare
 try {
    // Should Pass
    const modeSquareOne = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
    console.log('modeSquared passed successfully');
 } catch (e) {
    console.error('modeSquared failed test case');
 }
 try {
    // Should Fail
    const modeSquareTwo = arrayUtils.modeSquared(1,2,3);
    console.error('modeSquared did not error');
 } catch (e) {
    console.log('modeSquared failed successfully');
 }

//medianElement
 try {
    // Should Pass
    const medianElementOne = arrayUtils.medianElement([5, 6, 7]);
    console.log('medianElement passed successfully');
 } catch (e) {
    console.error('medianElement failed test case');
 }
 try {
    // Should Fail
    const medianElementTwo = arrayUtils.medianElement(1,2,3);
    console.error('medianElement did not error');
 } catch (e) {
    console.log('medianElement failed successfully');
 }


//merge
try {
    // Should Pass
    const mergeOne = arrayUtils.merge([1, 2, 3, 'g'], ['d','a', 's']);
    console.log('merge passed successfully');
 } catch (e) {
    console.error('merge failed test case');
 }
 try {
    // Should Fail
    const mergeTwo = arrayUtils.merge([1, 2, 3], []);
    console.error('merge did not error');
 } catch (e) {
    console.log('merge failed successfully');
 }


//sortString
try {
    // Should Pass
    const sortStringOne = stringUtils.sortString('123 FOO BAR!');
    console.log('sortString passed successfully');
 } catch (e) {
    console.error('sortString failed test case');
 }
 try {
    // Should Fail
    const sortStringTwo = stringUtils.sortString(123);
    console.error('sortString did not error');
 } catch (e) {
    console.log('sortString failed successfully');
 }

 //replaceChar
try {
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("Daddy", 2);
    console.log('replaceChar passed successfully');
 } catch (e) {
    console.error('replaceChar failed test case');
 }
 try {
    // Should Fail
    const replaceCharTwo = stringUtils.replaceChar("Daddy", 0);
    console.error('replaceChar did not error');
 } catch (e) {
    console.log('replaceChar failed successfully');
 }

//mashUp
try {
    // Should Pass
    const mashUpOne = stringUtils.mashUp("Patrick", "Hill", "$");
    console.log('mashUp passed successfully');
 } catch (e) {
    console.error('mashUp failed test case');
 }
 try {
    // Should Fail
    const mashUpCharTwo = stringUtils.mashUp("Patrick", "Hill", 1);
    console.error('mashUp did not error');
 } catch (e) {
    console.log('mashUp failed successfully');
 }

//computeObjects
try {
    // Should Pass
    const computeObjectsOne = objUtils.computeObjects([{ x: 2, y: 3},{ a: 70, x: 4, z: 5 }], x => x*2);
    console.log('computeObjects passed successfully');
 } catch (e) {
    console.error('computeObjects failed test case');
 }
 try {
    // Should Fail
    const computeObjectsTwo = objUtils.computeObjects([{ x: 2, y: 3},{ a: 70, x: 4, z: 5 }]);
    console.error('computeObjects did not error');
 } catch (e) {
    console.log('computeObjects failed successfully');
 }


 //commonKeys
try {
    // Should Pass
    const commonKeysOne = objUtils.commonKeys({a: 2, b: 4},{a: 5, b: 4});
    console.log('commonKeys passed successfully');
 } catch (e) {
    console.error('commonKeys failed test case');
 }
 try {
    // Should Fail
    const commonKeysTwo = objUtils.commonKeys();
    console.error('commonKeys did not error');
 } catch (e) {
    console.log('commonKeys failed successfully');
 }


  //flipObject
try {
    // Should Pass
    const flipObjectOne = objUtils.flipObject({ a: 3, b: 7, c: 5 });
    console.log('flipObject passed successfully');
 } catch (e) {
    console.error('flipObject failed test case');
 }
 try {
    // Should Fail
    const flipObjectTwo = objUtils.flipObject();
    console.error('flipObject did not error');
 } catch (e) {
    console.log('flipObject failed successfully');
 }

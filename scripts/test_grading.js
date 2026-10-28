const fs = require('fs');

// Extract normalizeAnswerString and isAnswerCorrect from js/unit_runner.js
const code = fs.readFileSync('js/unit_runner.js', 'utf8');
const fnMatches = code.match(/function normalizeAnswerString[\s\S]*?function submitCurrentExercise/);
if (!fnMatches) {
  console.error('Could not extract functions');
  process.exit(1);
}

eval(fnMatches[0].replace('function submitCurrentExercise', ''));

console.log('Testing grading function:');
const t1 = isAnswerCorrect('mine', 'mine');
console.log('1. exact:', t1);
const t2 = isAnswerCorrect('she’s', "she's");
console.log('2. smart quote:', t2);
const t3 = isAnswerCorrect('mine.', 'mine');
console.log('3. punctuation:', t3);
const t4 = isAnswerCorrect('have to go / have', 'have to go, have');
console.log('4. multiblank comma vs slash:', t4);
const t5 = isAnswerCorrect('can not', 'can (not)');
console.log('5. optional parens:', t5);
const t6 = isAnswerCorrect('his', 'mine');
console.log('6. wrong answer (should be false):', t6);

const tests = [
  t1 === true,
  t2 === true,
  t3 === true,
  t4 === true,
  t5 === true,
  t6 === false
];

if (tests.every(Boolean)) {
  console.log('ALL UNIT RUNNER EVALUATION TESTS PASSED!');
} else {
  console.error('SOME TESTS FAILED!');
  process.exit(1);
}

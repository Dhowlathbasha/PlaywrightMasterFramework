import test from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

// test.describe('A, runs in parallel with B', () => {
//   test.describe.configure({ mode: 'parallel' });
//   test('in order A1', async ({}) => {
//     console.log('test A1');
//   });
//   test('in order A2', async ({}) => {
//     console.log('test A2');
//   });
// });

// test.describe('B, runs in parallel with A', () => {
//   test.describe.configure({ mode: 'parallel' });
//   test('in order B1', async ({}) => {
//     console.log('test B1');
//   });
//   test('in order B2', async ({}) => {
//     console.log('test B2');
//   });
// });

/* eslint-disable playwright/no-skipped-test */
import { test } from '@fixtures/pageFixture';
import moment from 'moment';

test.describe('Amazon', () => {
  test.describe.configure({ mode: 'parallel' });

  // for (let index = 1; index < 10; index++) {
  //   test('in order A1', async ({}) => {
  //     //here the skip condtion from the csv / json
  //     test.skip(true, 'This feature is Safari-only');
  //     console.log('test A1 ', moment().format('DD-MMM-YYYY hh:mm:ss.SSS'));
  //   });
  // }

  test('in order A2', async ({ csvActions }) => {
    console.log('test A2 ', moment().format('DD-MMM-YYYY hh:mm:ss.SSS'));
    console.log(await csvActions.getData('dummycsv.csv', 'dummycsv', 'TC01_CreateAccountTest', 'TestID'));
  });
});

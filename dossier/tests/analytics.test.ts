//import { analytics } from '../src/modules/analytics.js';
import { analytics } from '../src/modules/analytics';
test('Should return: request name is Mr. Bean', () => {
  expect(analytics('Mr. Bean')).toBe('request name is Mr. Bean');
});

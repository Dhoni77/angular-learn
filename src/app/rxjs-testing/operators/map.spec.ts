import { cold} from 'jasmine-marbles';
import { map } from 'rxjs/operators';
describe('Test map from rxjs', () => {
    it('should multiply by "2" each value emitted', () => {
        const values = { a: 1, b: 2, c: 3, x: 2, y: 4, z: 6};
        const source = cold('-a-b-c-|', values);
        const expected = cold('-x-y-z-|', values);
        const result = source.pipe(map(x => x*2));
        console.log('r ',result);
        expect(result).toBeObservable(expected);
      });
})
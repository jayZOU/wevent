import Event from '../src/libs/event';
import {assert, expect} from 'chai'

let event = new Event();

describe('event test', () => {
	it('event.get test', () => {
		event.off();

		event.on('test', function () {}, {a: 1});
		event.on('test', function () {}, {a: 3});
		event.on('test1', function () {}, {a: 2});

		const testEvent = event.get();
		const testEvent1 = event.get('test');

		assert.isObject(testEvent, 'is not object');
		assert.isObject(testEvent1, 'is not object');

		Object.keys(testEvent).forEach((key) => {
			assert.isObject(testEvent[key], 'is not object');
			assert.isArray(testEvent[key]['list'], 'is not array');
			assert.isObject(testEvent[key]['data'], 'is not object');
		})

		expect(testEvent['test']['data'].a).to.equal(3);
		expect(testEvent['test1']['data'].a).to.equal(2);

		expect(testEvent1['data'].a).to.equal(3);
		expect(testEvent1['list'].length).to.equal(2);

	})
	it('event.on test', () => {
		event.off();

		assert.isUndefined(event.on(), 'is not undefined');

		event.on('test', function () {}, {a: 1});
		event.on('test', function () {}, {a: 3});
		event.on('test1', function () {}, {a: 2});

		const testEvent = event.get();

		expect(testEvent.test.list).to.be.an('array').that.does.not.include(3);
		expect(testEvent.test1.list).to.be.an('array').that.does.not.include(2);
		expect(testEvent['test']['data'].a).to.equal(3);
		expect(testEvent['test1']['data'].a).to.equal(2);
		// assert.isFunction(testEvent[0], 'not function');

	})

	it('event.emit test', () => {
		event.off();

		let count = 0;

		const cb = function (a, b) {
			expect(a * b).to.equal(25);
			++count;
		}
		const cb1 = function (a, b) {
			expect(a * b).to.equal(16);
		}

		assert.isUndefined(event.emit('test'), 'is not undefined');

		event.on('test', cb, {a: 1});
		event.on('test', cb, {a: 3});
		event.on('test1', cb1, {a: 2});

		const result = event.emit('test', 5, 5);
		const result1 = event.emit('test1', 4, 4);

		expect(result.a).to.equal(3);
		expect(result1.a).to.equal(2);
		expect(count).to.equal(2);

	})

	it('event.off test', () => {
		event.off();

		assert.isUndefined(event.off(), 'is not undefined');

		event.on('test', function () {}, {a: 1});
		event.on('test', function () {}, {a: 3});
		event.on('test1', function () {}, {a: 2});

		const testEvent = event.get();

		event.off('test')

		assert.isUndefined(testEvent.test, 'is not undefined');

		event.off()

		expect(Object.keys(event.get())).to.have.lengthOf(0);
	})
})
var Rx = require('rx');
var kafka = require('kafka-node');
var client = new kafka.Client('dockerhost:2181');
consumer = new kafka.HighLevelConsumer(client, [{ topic: 'rxjs' }], { groupId: 'rxjs-consumers' });

consumer.on('error', function(err) {
	console.log(err);
});

// var array = [{value: 'x'}, {value: 'y'}];
// var source = Rx.Observable.interval(2000)
// 				.take(array.length)
// 				.map(function(i) {
// 					return array[i];
// 				})

var source = Rx.Observable.fromEvent(consumer, 'message')
				.map(function(message) {
					return message.value;
				})
				.scan(function(acc, x) {
					return acc + x;
				});

var subscription = source.subscribe(function (message) {
	console.log(message);
});

var Rx = require('rx');
var kafka = require('kafka-node');
var client = new kafka.Client('dockerhost:2181');
consumer = new kafka.HighLevelConsumer(client, [{ topic: 'rxjs' }], { groupId: 'rxjs-consumers' });

consumer.on('error', function(err) {
	console.log(err);
});

var source = Rx.Observable.fromEvent(consumer, 'message')
				.map(function(message) {
					return message.value;
				})
				.scan('start', function(acc, x) {
					return acc + x;
				});

var subscription = source.subscribe(function (message) {
  console.log(message);
});

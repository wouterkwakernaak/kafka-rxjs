var Rx = require('rx');
var kafka = require('kafka-node');
var client = new kafka.Client('dockerhost:49153');
consumer = new kafka.HighLevelConsumer(client, [{ topic: 'rxjs' }], { groupId: 'rxjs-consumers' });

consumer.on('error', function(err) {
	console.log(err);
});
consumer.on('message', function(message) {
	console.log(message);
});

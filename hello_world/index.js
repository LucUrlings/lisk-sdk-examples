const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');
const HelloTransaction = require('./hello_transaction');
const PaymentTransaction = require('./payment_transaction');

configDevnet.app.label = 'HelloWorld-blockchain-app';

configDevnet.components.storage.database = 'lisk_dev2';
// configDevnet.components.storage.database = 'lisk_dev3';
configDevnet.components.storage.host = 'bepiscoin.feddema.dev';
configDevnet.components.storage.port = 5432;
configDevnet.components.storage.user = 'lisk';
configDevnet.components.storage.password = 'pass1234';
configDevnet.modules.http_api.access.public = true;

configDevnet.modules.network.seedPeers = [{ip: "144.91.116.43", wsPort: 5000}];

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(HelloTransaction);
app.registerTransaction(PaymentTransaction)

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});

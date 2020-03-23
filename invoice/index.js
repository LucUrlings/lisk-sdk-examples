const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');
const { InvoiceTransaction, PaymentTransaction } = require('./transactions/index');


// configDevnet.components.storage.database = 'lisk_dev2'; //server
configDevnet.components.storage.database = 'lisk_dev2'; //local
configDevnet.components.storage.host = 'postgres.feddema.dev';
configDevnet.components.storage.port = 5433;
configDevnet.components.storage.user = 'lisk';
configDevnet.components.storage.password = 'pass1234';
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(InvoiceTransaction);
app.registerTransaction(PaymentTransaction);

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});

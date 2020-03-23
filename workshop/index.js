const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk');

// @todo uncomment these accordingly, during the workshop
const { InvoiceTransaction } = require('./transactions/index');
const { PaymentTransaction } = require('./transactions/index');
const transactions = require('@liskhq/lisk-transactions');

// configDevnet.components.storage.database = 'lisk_dev2'; //server
configDevnet.components.storage.database = 'lisk_dev3'; //local
configDevnet.components.storage.host = 'postgres.feddema.dev';
configDevnet.components.storage.port = 5433;
configDevnet.components.storage.user = 'lisk';
configDevnet.components.storage.password = 'pass1234';
configDevnet.modules.http_api.access.public = true;

genesisBlockDevnet.transactions[0].asset.recipientId= "16313739661670634666L";

const app = new Application(genesisBlockDevnet, configDevnet);



// @todo uncomment these accordingly, during the workshop
app.registerTransaction(InvoiceTransaction);
app.registerTransaction(PaymentTransaction);
app.registerTransaction(transactions);

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});
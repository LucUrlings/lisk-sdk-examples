const createSendableTransaction = require('./create_cashback');

/**
 *  To send printed transaction:
 *  > node src/transactions/create_trs.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
 *  Note: An application needs to run on port 4000 (the default one) before.
 */
let t = createSendableTransaction({
	type: 9,
	data: null,
	amount: `${10 ** 8}`,
	fee: `${10 ** 7}`,
	recipientId: '10881167371402274308L', //delegate genesis_100
	recipientPublicKey: 'addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9',
	senderPublicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f',
	passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble',
	secondPassphrase: null,
	timestamp: 2,
});

console.log(t);
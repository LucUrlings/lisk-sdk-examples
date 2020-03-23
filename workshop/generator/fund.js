const transactions = require('@liskhq/lisk-transactions');
const {getNetworkIdentifier} = require('@liskhq/lisk-cryptography');
const networkIdentifier = getNetworkIdentifier(
    "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
    "Lisk",
);

// ------- Transfer Transaction JSON to fund account ------- //
const transaction = transactions.transfer({
		type: 0,
		amount: '100000000000', // 100000 LSK
		recipientId: '8273455169423958419L',
		fee: '0',
		asset: {},
		passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble',
		networkIdentifier:networkIdentifier
});

console.log('------------- Fund Account Tx - Type 0 -----------------');
console.log(
	`curl -XPOST -H "Content-type: application/json" -d '${JSON.stringify(transaction)}' http://localhost:4000/api/transactions`,
);
process.exit(0);

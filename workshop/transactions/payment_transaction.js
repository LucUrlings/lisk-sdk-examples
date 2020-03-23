const {
	TransferTransaction,
	TransactionError,
} = require('@liskhq/lisk-transactions');

class PaymentTransaction extends TransferTransaction {
	// static get MINIMUM_REMAINING_BALANCE() {
	// 	return '-10000000000000000000000000000000000000000000000000';
	// }

	static get TYPE() {
		return 14;
	}

	async prepare(store) {
    	await store.account.cache([
        	{
            	address: this.senderId,
        	},
        	{
            	address: this.recipientId,
        	},
    	]);
    	await store.transaction.cache([
        	{
           	 id: this.asset.data,
        	},
    	]); // To be replaced (step 1 & 2)
	}
	
	applyAsset(store) {
		const errors = super.applyAsset(store);
	
		const transaction = store.transaction.find(
			transaction => transaction.id === this.asset.data
		); // Find related invoice in transactions for invoiceID
	
		if (transaction) {
			if (this.amount.lt(transaction.asset.requestedAmount)) {
				errors.push(new TransactionError(
					'Paid amount is lower than amount stated on invoice',
					this.id,
					'.amount',
					transaction.requestedAmount,
					'Expected amount to be equal or greater than `requestedAmount`',
				));
			}
			if (transaction.senderId !== this.recipientId) {
				errors.push(new TransactionError(
					'RecipientId is not equal to the address that has sent the invoice.',
					this.id,
					'.recipientId',
					this.recipientId,
					transaction.senderId,
				));
			}
		} else {
			errors.push(new TransactionError(
				'Invoice does not exist for ID',
				this.id,
				'.asset.invoiceID',
				this.asset.data,
				'Existing invoiceID registered as invoice transaction',
			));
		}
	
		return errors;
	}

	undoAsset(store) {
		// No rollback needed as there is only validation happening in applyAsset
		// Higher level function will rollback the attempted payment (send back tokens)
	
		const errors = super.undoAsset(store);
	
		return errors;
	}
}

module.exports = PaymentTransaction;

const {
	BaseTransaction,
	TransactionError,
} = require('@liskhq/lisk-transactions');

class InvoiceTransaction extends BaseTransaction {
	// static get MINIMUM_REMAINING_BALANCE() {
	// 	return '-10000000000000000000000000000000000000000000000000';
	// }

	static get TYPE() {
		return 13;
	}

	static get FEE() {
		return `${0}`;
	}

	async prepare(store) {
		await store.account.cache([
			{
				address: this.senderId,
			},
		]);
	}

	validateAsset() {
		const errors = [];
		if (!this.asset.client || typeof this.asset.client !== 'string') {
			errors.push(
				new TransactionError(
					'Invalid "asset.client" defined on transaction',
					this.id,
					'.asset.client',
					this.asset.client,
					'A string value',
				),
			);
		}
		if (
			!this.asset.requestedAmount ||
			typeof this.asset.requestedAmount !== 'string'
		) {
			errors.push(
				new TransactionError(
					'Invalid "asset.requestedAmount" defined on transaction',
					this.id,
					'.asset.requestedAmount',
					this.asset.requestedAmount,
					'A string value',
				),
			);
		}
		if (!this.asset.description || typeof this.asset.description !== 'string') {
			errors.push(
				new TransactionError(
					'Invalid "asset.description" defined on transaction',
					this.id,
					'.asset.description',
					this.asset.description,
					'A string value',
				),
			);
		}
		return errors;
	}

	applyAsset(store) {
		const sender = store.account.get(this.senderId);

		// Save invoice count and IDs
		if (!sender.asset.invoiceCount) {
			sender.asset.invoiceCount = 0;
		}

		if (!sender.asset.invoicesSent) {
			sender.asset.invoicesSent = [];
		}

		sender.asset.invoiceCount++;
		sender.asset.invoicesSent.push(this.id);

		store.account.set(sender.address, sender);
		return [];
	}

	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const errors = [];
		const invoiceId = sender.asset.invoicesSent.find(id => id === this.id);
	
		if (invoiceId === undefined || sender.asset.invoiceCount === 0) {
			errors.push(
				new TransactionError(
					'Invoice ID does not exist in sender.asset.invoicesSent',
					this.id,
					'sender.asset.invoicesSent',
					sender.asset.invoicesSent,
					'A string value',
				),
			);
		} else {
			// Undo logic comes here
			sender.asset.invoiceCount--;
			sender.asset.invoicesSent = sender.asset.invoicesSent.filter(
				id => id !== this.id,
			);
	
			store.account.set(sender.address, sender); // Save updated sender account
		}
	
		return errors;
	}
}

module.exports = InvoiceTransaction;

const cryptography = require('@liskhq/lisk-cryptography');
const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
	'vacant dog link rally meadow muscle thought alone physical fence rookie december',
	'elephant tree paris dragon chair galaxy',
);

console.log(encryptedPassphrase);


console.log("iterations=" + encryptedPassphrase.iterations +
	"&salt=" + encryptedPassphrase.salt +
	"&cipherText=" + encryptedPassphrase.cipherText +
	"&iv=" + encryptedPassphrase.iv +
	"&tag=" + encryptedPassphrase.tag +
	"&version=" + encryptedPassphrase.version);

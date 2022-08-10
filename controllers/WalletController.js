const db = require('../models/walletModel');
//{where:{used:false}}
exports.findWallets = async () => {
    let walletsList = [];
    await db.Wallet.findAll()
        .then((data) => {
            data.forEach(element => {
                const wallet = {
                    address: element.address,
                    publicKey: element.publicKey,
                    privateKey: element.privateKey,
                    seedPhrase: element.seedPhrase,
                    used:element.used,
                    image:element.image
                }
                walletsList.push(wallet);
            });
        })
        .catch(err => {
            console.error(err);
        })
    console.log(walletsList);
    return walletsList;
}

exports.isUsed=async(address)=>{
    await db.Wallet.update({used:true},{where:{address:address}})
    .then(()=>{
        console.log("");
    })
    .catch((err)=>{
        console.error(err);
    })
}
const express = require('express');
const fs = require('fs');
const db = require('./controllers/WalletController');
let parseUrl = require('body-parser');
let encodeUrl = parseUrl.urlencoded({ extended: true });
const webhook = require('./webhook/Webhook');
let app = express();
app.set('view engine', 'ejs');
const myCss = {
    style: fs.readFileSync('./views/css/style.css', 'utf8')
};
const port = process.env.PORT || 3000

async function main() {
    let addressesToSend = new Map();
    const list = await db.findWallets();
    list.forEach(wallet => {
        addressesToSend.set(wallet.address, 'none');

        app.get('/' + wallet.address,async (_req, res) => {
            await db.isUsed(wallet.address);
            res.render("landingPage", { address: wallet.address, myCss: myCss,image:wallet.image});
        })

        app.get('/' + wallet.address + '/transfer', (_req, res) => {
                res.render("yesWallet", { address: wallet.address, myCss: myCss });            
        })

        app.post('/' + wallet.address + '/transfer', encodeUrl, (req, res) => {
            addressesToSend.set(wallet.address, req.body.userAddress);
            res.render("youSure", { address: req.body.userAddress, wallet: wallet.address, myCss: myCss });
        })

        app.get('/' + wallet.address + '/transferConfirmed', (_req, res) => {
            webhook.sendAddress(wallet.address, addressesToSend.get(wallet.address));
            res.render("confirm", { address: addressesToSend.get(wallet.address), wallet: wallet, myCss: myCss });
        })

        app.get('/' + wallet.address + '/credentials', (_req, res) => {
            res.render("noWallet", { wallet: wallet, myCss: myCss });
        })
    });
}

main();

app.listen(port, () => {
    console.log("App is listening on port");
})
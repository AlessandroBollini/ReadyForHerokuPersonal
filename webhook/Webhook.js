const { IncomingWebhook } = require('ms-teams-webhook');
const url = "https://sisalgroup.webhook.office.com/webhookb2/80a1a58a-e888-45bb-8404-c7e6e7ef3f3d@72d74aa2-ffea-4854-b246-6241845ee5ff/IncomingWebhook/3372dfcba6294f20887fc062923afea1/8ee71990-c5f7-478d-a883-2274d8541dab";
const webhook = new IncomingWebhook(url);

exports.sendAddress = async (oldWallet, newWallet) => {
    await webhook.send(JSON.stringify({
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Issue 176715375",
        "themeColor": "0078D7",
        "title": "Incoming message",
        "sections": [
            {
                "text": "Address sent: " + newWallet + " from wallet: " + oldWallet
            }
        ]
    }))
}
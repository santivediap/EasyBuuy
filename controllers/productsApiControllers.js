require('dotenv').config()

const searchProducts = (req, res) => {

    const { search } = req.body

    let ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');

    let defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

    defaultClient.accessKey = process.env.ACCESS_KEY;
    defaultClient.secretKey = process.env.SECRET_KEY;
    defaultClient.host = process.env.HOST;
    defaultClient.region = process.env.REGION;

    let api = new ProductAdvertisingAPIv1.DefaultApi();

    let searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

    searchItemsRequest['PartnerTag'] = process.env.PARTNER_TAG;
    searchItemsRequest['PartnerType'] = 'Associates';
    searchItemsRequest['Keywords'] = search;
    searchItemsRequest['ItemCount'] = 10;
    searchItemsRequest['Resources'] = ['Images.Primary.Large', 'ItemInfo.Title', 'Offers.Listings.Price', "ItemInfo.ProductInfo", "ItemInfo.ContentInfo", "ItemInfo.Features", "ItemInfo.ByLineInfo", "ItemInfo.ManufactureInfo", "ItemInfo.Classifications", "ItemInfo.ContentRating", "ItemInfo.TradeInInfo"];

    try {
        api.searchItems(searchItemsRequest, (error, data, response) => {
            if (error) {
                res.json({ error })
            } else {
                res.json(data.SearchResult.Items)
            }
        });
      } catch (ex) {
        res.json({ error: ex })
      }
}

module.exports = {
    searchProducts
}
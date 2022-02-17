import { getAssets } from "Components/contentful/contentful";

export const TCGCONTENTFULKEYS = {
    TCG_BIG_BANNER: 'tcgLandingpage',
    TCG_EVENTS: 'landingpageEvents',
    TCG_OFFERS: 'landingpageOffers',
    TCG_BLOGS: 'blogSingle'
}

export const FindImageUrl = (id) => {
    let imageUrl;
    return getAssets().then(assetData => {
        const index = assetData.findIndex(image => image.sys.id === id);
        return assetData[index].fields.file.url;
    })
}

export const makeDataArray = (mergeData) => {
    const bannerData: any = [];
    mergeData.map((config, index) => {
        if (!!config.fields.image.fields) {
            bannerData.push({ ...config.fields, url: config.fields.image.fields.file.url })
        } else {
            bannerData.push({ ...config.fields, url: '' })
        }
    })
    return bannerData;
}
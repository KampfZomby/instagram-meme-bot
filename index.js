require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

let image;

async function getImage() {
      
    const res = await fetch("https://meme-api.com/gimme")
      
    image = await res.json();
    
    url = image.url

    console.log(image.url)
}
      
getImage();

const postToInsta = async () => {

    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const imageBuffer = await get({
        url: image.url,
        encoding: null, 
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: image.title + "\n by " + image.author + " from " + image.postLink,
    });

}

postToInsta();
const cheerio = require('cheerio');
const Art = require('../models/artModel');
//in a general sense, i'm sorry if you have to read this. a lot of these queries are annoying webscraping that makes no sense without the context of how the pages I'm scraping are structured.
//you can sort of just assume it works, as it mostly does. if you have a better idea than scraping wikipedia for this information, I would LOVE to hear it.
const artController = {


    
    //im very sorry about this, I tried my best to make it readable :)

    async queryArt(request, response, next) {
        try {
            const queryString = request.body.queryString;

            if (!queryString) {
                return next({ error: 'queryString is required.' })
            }
            const pageName = await (findPageTitle(queryString));
            const prelimArtObj = await parsePageHTML(pageName);
            // this grabs info off the wikipedia page's infobox.
            response.locals.artObj = prelimArtObj;
            return next();
        } catch (error) {
            console.log('error in trueQueryArt: ' + error)
            return next(error)
        }

    },

    async getBigImage(request, response, next) {
        try {
            //here, we query wikimedia to try to get a higher resolution image, as well as any information not in the wikipedia infobox.
            const commonsApiUrl = 'https://commons.wikimedia.org/w/api.php';
            const searchQueryQ = request.body.queryString;
            const searchQuery = searchQueryQ.replace(/ /g, '_');
            const searchUrl = `${commonsApiUrl}?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=6`;

            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();


            if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
                const firstResult = searchData.query.search[0];
                const imageTitle = firstResult.title;

                //link to the page - if we ever have to figure out getting slightly smaller images there are some hosted here.
                //if you're not me and working on this, have fun!

                const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageTitle)}`;

                response.locals.artObj.bigUrl = imageUrl;
                //if the infobox from Wikipedia didn't work, we can try the one on wikimedia. 
                //yeah it's kind of indecent to do this in the getBigImage middleware, but we're already querying it here so idk man
                //for clarity: we're querying the Summary Box from Wikimedia (which sometimes contains info the main wikipedia does not) and filling in the appropriate properties. the Artist one might be a little wonky, so you've been warned. 
                if (!response.locals.artObj.hasOwnProperty('Artist') || !response.locals.artObj.hasOwnProperty('Year') || !response.locals.artObj.hasOwnProperty('Medium')) {
                    const fileUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(imageTitle)}`;
                    const bonusText = await fetch(fileUrl)
                    parsedBonusText = await bonusText.text();

                    function isElementVisible(element) {
                        return element.css('display') !== 'none';
                    }

                    const $ = cheerio.load(parsedBonusText);
                    const summaryBox = $('.fileinfotpl-type-artwork');
                    //console.log("summary box: ")
                    //console.log(summaryBox.children())
                    if (!response.locals.artObj.hasOwnProperty('Year')) {
                        const dateContainer = summaryBox.find('#fileinfotpl_date');
                        if (dateContainer.length > 0) {

                            const divs = dateContainer.next()
                            divs.each((index, divElement) => {
                                const div = $(divElement);
                                if (isElementVisible(div)) {
                                    const content = div.text().trim();
                                    const inputString = content;
                                    const regexPattern = /\d{4}/; //four consecutive digits - we may have issues if something was made before 1000CE
                                    //I can't decided if we should keep this - it helps for finding a date, but it often erases date ranges. hmmmmmmm.
                                    const match = inputString.match(regexPattern);

                                    if (match) {
                                        const extractedDigits = match[0];

                                        response.locals.artObj.Year = extractedDigits;
                                    }
                                }
                            });
                        }
                    }
                    if (!response.locals.artObj.hasOwnProperty('Medium')) {
                        const mediumContainer = summaryBox.find('#fileinfotpl_art_medium').next();
                        response.locals.artObj.Medium = mediumContainer.contents().text().trim();
                    }
                    if (!response.locals.artObj.hasOwnProperty('Artist')) {
                        const artistContainer = summaryBox.find('#creator');
                        //may or may not work in all cases. it's fairly rare that this comes up, though. 
                        response.locals.artObj.Artist = artistContainer.children().first().text().trim();
                    }
                }
            }
            else {
                console.log('error fetching big image?')
            }
            return next();
        }
        catch (error) {
            console.log('error in getBigImage: ' + error)
            next(error)
        }
    },
    //NB - we should probably send this info back to the user & let them modify it before we save it tbh
    //I just don't want to make the frontend girlies do that :)
    //also this should very obviously be in postgres.... but I'm lazy?
    async saveNewArt(request, response, next) {
        try {
            console.log(response.locals.artObj)

            const newPendingArt = new Art({

                title: response.locals.artObj.title,
                artist: response.locals.artObj.Artist,
                year: response.locals.artObj.Year,
                medium: response.locals.artObj.Medium,
                thumbnailURL: response.locals.artObj.thumbnailUrl,
                url: response.locals.artObj.bigUrl,
                emotion: request.body.emotion,
                submitted_by: request.body.submitted_by



            })
            console.log(newPendingArt)
            await newPendingArt.save()
            return next()
        } catch (error) {
            console.log('error in saveNewArt: ' + error)
            next(error)
        }

    },

    async findArt(request, response, next) {
        try {
            const queriedEmotion = request.body.emotion;
            const returnedArt = await Art.find({ emotion: queriedEmotion })
            response.locals.foundArt = returnedArt;
            return next()
        } catch (error) {
            console.log('error in art finding: ' + error)
            return next({ error: 'error in art finding' })
        }
    },

    async vote(request, response, next) {
        try {
            scoreVal = request.body.score;
            const votedUpon = await Art.findOneAndUpdate({ _id: request.body.id }, { $inc: { score: scoreVal }, }, { new: true })
            response.locals.voted = votedUpon;
            return next()
        } catch (error) {
            console.log('error in voting: ' + error)
            return next({ error: 'error in voting' })
        }
    },
}
// these are two helper funcitons to ensure that trueQueryArt is less horrid.
//future programmers, these can probably be sent off to some utils folder.
async function parsePageHTML(pageName) {
    try {
        const dataArray = ['Artist', 'Year', 'Medium']
        const outputObj = {
            title: pageName,
        }
        const pageNameWithUnderscores = pageName.replace(/ /g, '_');
        const url = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(pageNameWithUnderscores)}/html`;
        // console.log(url)

        const response = await fetch(url)
        const responseText = await response.text();

        const $ = cheerio.load(responseText)
        const summaryBox = $('.infobox')

        summaryBox.find('tr').each((index, element) => {
            const label = $(element).find('th').text();
            const value = $(element).find('td').text();

            if (dataArray.includes(label)) {
                outputObj[label] = value;
            }

            const infoboxImage = $(element).find('.infobox-image');
            if (infoboxImage.length > 0) {
                const imgLink = infoboxImage.find('a img').attr('src')
                outputObj.thumbnailUrl = imgLink;
            }
        });
        return outputObj
    }
    catch (error) {
        console.error('error in parsePageHTML ' + error);
       // return next(error)
    }
}

async function findPageTitle(query) {
    try {
        const languageCode = 'en';
        const searchQuery = query;
        const numberOfResults = 1;
        const headers = {
            //lol we need to get this token eventually or wikipedia will be mad
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            'User-Agent': 'Articons - crispulum@gmail.com'
        };
        const baseUrl = 'https://api.wikimedia.org/core/v1/wikipedia/';
        const endpoint = '/search/page';
        const url = baseUrl + languageCode + endpoint;
        const parameters = { q: searchQuery, limit: numberOfResults };

        const queryString = new URLSearchParams(parameters).toString();
        const fullUrl = `${url}?${queryString}`;

        const response = await fetch(fullUrl, { headers });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.pages[0].title;
    } catch (error) {
        console.error('error in findPageTitle ' + error);
       // return next(error)
    }
}

module.exports = artController;
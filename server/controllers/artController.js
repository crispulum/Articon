const cheerio = require('cheerio');
const Art = require('../models/artModel');

const artController = {


    //no longer using this but im keeping it in case I need it
    // async testFindArt() {
    //     try {

    //         const commonsApiUrl = 'https://commons.wikimedia.org/w/api.php';
    //         const searchQuery = "The_Lament_For_Icarus_Draper"; // query text
    //         const searchUrl = `${commonsApiUrl}?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=6`;

    //         const searchResponse = await fetch(searchUrl);
    //         const searchData = await searchResponse.json();


    //         if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
    //             const firstResult = searchData.query.search[0];
    //             const imageTitle = firstResult.title;

    //             const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageTitle)}`;
    //             const fileUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(imageTitle)}`;

    //             const fileResponse = await fetch(fileUrl);
    //             const fileContent = await fileResponse.text();
    //             const $ = cheerio.load(fileContent);

    //             const summaryBox = $('.fileinfotpl-type-artwork');

    //             if (summaryBox) {


    //                 function isElementVisible(element) {
    //                     return element.css('display') !== 'none';
    //                 }
    //                 // helper function to filter out invisible divs, that exist for some inexplicable reason. 


    //                 //stupid logic to fetch the medium text.
    //                 const mediumContainer = summaryBox.find('#fileinfotpl_art_medium').next();
    //                 if (mediumContainer.length > 0) {
    //                     const divs = mediumContainer.children()
    //                     divs.each((index, divElement) => {
    //                         const div = $(divElement);
    //                         if (isElementVisible(div)) {
    //                             const medium = div.text().trim();
    //                         }
    //                     });
    //                 }

    //                 //stupid logic to fetch the date text.
    //                 const dateContainer = summaryBox.find('#fileinfotpl_date');
    //                 if (dateContainer.length > 0) {
    //                     const divs = dateContainer.next()
    //                     divs.each((index, divElement) => {
    //                         const div = $(divElement);
    //                         if (isElementVisible(div)) {
    //                             const content = div.text().trim();
    //                             const inputString = content;
    //                             const regexPattern = /\d{4}/; //  regex pattern for four consecutive digits

    //                             const match = inputString.match(regexPattern);

    //                             if (match) {
    //                                 date = match[0];

    //                             }
    //                         }
    //                     });
    //                 }

    //                 const inputtedArtist = 'Test Artist';
    //                 const submitted_by = 'ari';

    //                 const newArt = new Art({
    //                     title: imageTitle,
    //                     artist: inputtedArtist,
    //                     year: date,
    //                     url: imageUrl,
    //                     medium: medium,
    //                     submitted_by: submitted_by,
    //                 });

    //                 const savedNewArt = await newArt.save();
    //                 response.locals.newArt = savedNewArt;
    //                 return next();
    //             }
    //         } else {
    //             console.error("No media files found.");
    //         }
    //     }
    //     catch (error) {
    //         console.log('error in art creation: ' + error)
    //         return next({ error: 'error in art creation' })
    //     }

    // },

    // async testFindArt() {
    //     try {

    //         const commonsApiUrl = 'https://commons.wikimedia.org/w/api.php';
    //         const searchQuery = "The_Lament_For_Icarus_Draper"; // query text
    //         const searchUrl = `${commonsApiUrl}?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=6`;

    //         const searchResponse = await fetch(searchUrl);
    //         const searchData = await searchResponse.json();


    //         if (searchData.query && searchData.query.search && searchData.query.search.length > 0) {
    //             const firstResult = searchData.query.search[0];
    //             const imageTitle = firstResult.title;

    //             const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageTitle)}`;
    //             const fileUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(imageTitle)}`;

    //             const fileResponse = await fetch(fileUrl);
    //             const fileContent = await fileResponse.text();
    //             const $ = cheerio.load(fileContent);

    //             const summaryBox = $('.fileinfotpl-type-artwork');

    //             if (summaryBox) {


    //                 function isElementVisible(element) {
    //                     return element.css('display') !== 'none';
    //                 }
    //                 // helper function to filter out invisible divs, that exist for some inexplicable reason. 


    //                 //stupid logic to fetch the medium text.
    //                 const mediumContainer = summaryBox.find('#fileinfotpl_art_medium').next();
    //                 if (mediumContainer.length > 0) {
    //                     const divs = mediumContainer.children()
    //                     divs.each((index, divElement) => {
    //                         const div = $(divElement);
    //                         if (isElementVisible(div)) {
    //                             const medium = div.text().trim();
    //                         }
    //                     });
    //                 }

    //                 //stupid logic to fetch the date text.
    //                 const dateContainer = summaryBox.find('#fileinfotpl_date');
    //                 if (dateContainer.length > 0) {
    //                     const divs = dateContainer.next()
    //                     divs.each((index, divElement) => {
    //                         const div = $(divElement);
    //                         if (isElementVisible(div)) {
    //                             const content = div.text().trim();
    //                             const inputString = content;
    //                             const regexPattern = /\d{4}/; //  regex pattern for four consecutive digits

    //                             const match = inputString.match(regexPattern);

    //                             if (match) {
    //                                 date = match[0];

    //                             }
    //                         }
    //                     });
    //                 }

    //                 const inputtedArtist = 'Test Artist';
    //                 const submitted_by = 'ari';

    //                 const newArt = new Art({
    //                     title: imageTitle,
    //                     artist: inputtedArtist,
    //                     year: date,
    //                     url: imageUrl,
    //                     medium: medium,
    //                     submitted_by: submitted_by,
    //                 });

    //                 const savedNewArt = await newArt.save();
    //                 response.locals.newArt = savedNewArt;
    //                 return next();
    //             }
    //         } else {
    //             console.error("No media files found.");
    //         }
    //     }
    //     catch (error) {
    //         console.log('error in art creation: ' + error)
    //         return next({ error: 'error in art creation' })
    //     }

    // },
    //im very sorry about this, I tried my best to make it readable :)
    async trueQueryArt(request, response, next) {
        try {
            const queryString = request.body.queryString;

            if (!queryString) {
                return next({ error: 'queryString is required.' })
            }
            const pageName = await (findPageTitle(queryString));
            const prelimArtObj = await parsePageHTML(pageName);
            response.locals.artObj = prelimArtObj;
            return next();
        } catch (error) {
            console.log('error in trueQueryArt: ' + error)
            return next(error)
        }

    },

    async getBigImage(request, response, next) {
        try {
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
                        response.locals.artObj.Artist =  artistContainer.children().first().text().trim();
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

    async saveNewArt(request, response, next) {
        try {
            console.log(response.locals.artObj)
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
            Art.findOneAndUpdate({ _id: request.body.id }, { $inc: { score: scoreVal } })
            return next()
        } catch (error) {
            console.log('error in voting: ' + error)
            return next({ error: 'error in voting' })
        }
    },

    async testMW(request, response, next) {
        try {
            console.log('middleware =)')
            return next()
        } catch (error) {
            console.log('error in testMW: ' + error)
            return next({ error: 'error in testMW' })
        }
    }
}

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
            'User-Agent': 'Articons'
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
    }
}

module.exports = artController;
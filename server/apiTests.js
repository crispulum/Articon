// const cheerio = require('cheerio')
// const commonsApiUrl = 'https://commons.wikimedia.org/w/api.php';


// const searchQuery = "The_Son_Of_Man_Magritte"; // query text
// const searchUrl = `${commonsApiUrl}?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=6`;

// fetch(searchUrl)
//     .then(response => response.json())
//     .then(data => {
//         // assume the first result is the right one lol
//         if (data.query && data.query.search && data.query.search.length > 0) {
//             const firstResult = data.query.search[0];
//             const imageTitle = firstResult.title;

//             //create image url from search result
//             const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageTitle)}`;

//             console.log("Main Image URL:", imageUrl);


//             //get the file's page
//             const fileUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(imageTitle)}`;
//             console.log('fileURL is ' + fileUrl)
//             fetch(fileUrl)
//                 .then(response => response.text())
//                 .then(fileContent => {
//                     //console.log(fileContent)
//                     const $ = cheerio.load(fileContent);

//                     // look at the summaryBox. grab pertinent info from it. 
//                     const summaryBox = $('.fileinfotpl-type-artwork');
//                     if (summaryBox.length > 0) {
//                         function isElementVisible(element) {
//                             return element.css('display') !== 'none';
//                         }
//                         // filter out invisible divs, that exist for some inexplicable reason. 
//                         const dateElement = summaryBox.find('#fileinfotpl_date');
//                         if (dateElement.length > 0 && isElementVisible(dateElement)) {
//                             const date = dateElement.next().find('a').text().trim();
//                             console.log("Date:", date);
//                         }



//                         const mediumContainer = summaryBox.find('#fileinfotpl_art_medium').next();
//                         if (mediumContainer.length > 0) {
//                             const divs = mediumContainer.children()
//                             divs.each((index, divElement) => {
//                                 const div = $(divElement);
//                                 if (isElementVisible(div)) {
//                                     const content = div.text().trim();
//                                     console.log("Content:", content);
//                                 }
//                             });
//                         }


//                         // const dateContainer = summaryBox.find('#fileinfotpl_date').next();
//                         // if (dateContainer.length > 0) {
//                         //     const divs = dateContainer.children()
//                         //     divs.each((index, divElement) => {
//                         //         const div = $(divElement);
//                         //         if (isElementVisible(div)) {
//                         //             const content = div.text().trim();
//                         //             console.log("Content:", content);
//                         //         }
//                         //     });
//                         // }


//                         const dateContainer = summaryBox.find('#fileinfotpl_date');
//                         if (dateContainer.length > 0) {
//                             const divs = dateContainer.next()
//                             divs.each((index, divElement) => {
//                                 const div = $(divElement);
//                                 if (isElementVisible(div)) {
//                                     const content = div.text().trim();
//                                     const inputString = content;
//                                     const regexPattern = /\d{4}/; //four consecutive digits - we may have issues if something was made before 1000CE

//                                     const match = inputString.match(regexPattern);

//                                     if (match) {
//                                         const extractedDigits = match[0]; 
//                                         console.log("Extracted digits:", extractedDigits);
//                                     } 
//                                 }
//                             });
//                         }



//                     }
//                 })
//         } else {
//             console.error("No media files found.");
//         }
//     })
//     .catch(error => {
//         console.error("Error fetching media files:", error);
//     });


const cheerio = require('cheerio');
// const { findArt } = require('./controllers/artController');
// async function testFindArt2() {
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

//             const searchDataText = await searchResponse.text();
//             const $ = cheerio.load(searchDataText)

//             const summaryBox = $('.infobox');

//             if (summaryBox) {
//                 console.log('box found')
//                 //console.log(summaryBox)
//                 const boxChildren = summaryBox.children();
//                 if (boxChildren) {
//                     console.log('boxChildren found')
//                     // console.log(boxChildren)
//                 }
//             }

//             //         const newArt = new Art({
//             //             title: imageTitle,
//             //             artist: inputtedArtist,
//             //             year: date,
//             //             url: imageUrl,
//             //             medium: medium,
//             //             submitted_by: submitted_by,
//             //         });

//             //         const savedNewArt = await newArt.save();
//             //         response.locals.newArt = savedNewArt;
//             //         return next();
//             //     }
//         }
//     }
//     catch (error) {
//         console.log('error in art creation: ' + error)
//         // return next({ error: 'error in art creation' })
//     }




// }
//testFindArt2();
async function findPageTitle(query) {
    try {
        const languageCode = 'en';
        const searchQuery = query;
        const numberOfResults = 1;
        const headers = {
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

async function parsePageHTML(pageName) {
    try {
        const dataArray = ['Artist', 'Year', 'Medium']
        const outputObj = {
            title: pageName,
        }
        const pageNameWithUnderscores = pageName.replace(/ /g, '_');
        const url = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(pageNameWithUnderscores)}/html`;
        console.log(url)

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
            if (infoboxImage.length >0) {
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


async function queryArt(request, response, next) {

    const queryString = request;
    const pageName = await findPageTitle(queryString);
    const prelimArtObj = await parsePageHTML(pageName)
    return prelimArtObj;
}



(async () => {
    const artObj = await queryArt('Starry Night Van Gogh')
    console.log(artObj)
}

)()
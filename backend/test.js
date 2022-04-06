const Scraper = require('image-scraper');
// let url = "https://www.google.com/search?rlz=1C1CHBF_enCA968CA968&sxsrf=APq-WBuQdvZhCJnNp0A3dFvdnLLBMarbvQ:1649279590731&source=univ&tbm=isch&q=cute+hedgehog+pictures&fir=TdXCCerHJ79DpM%252C4cFyqQlY2x5ALM%252C_%253Br2p6JudymgipNM%252Cpwl9otopeTp4uM%252C_%253BzWbBCu6p0H4zuM%252CMrdryOEZGJmh_M%252C_%253BEJgGymhrToExuM%252ClXpkgZ2X1Y-44M%252C_%253B-i2-7F-cm_WBqM%252C4cFyqQlY2x5ALM%252C_%253BMLchCgv5223AKM%252Cigsk3ATkF9O84M%252C_%253BWOq_actD1jX79M%252Ctefto9TESQLEgM%252C_%253BOQVS0bOChKtd_M%252CqzfoASTd8rOUWM%252C_%253BTFmB3GhBRifi4M%252CWikCiGZFukuFrM%252C_%253B-DqntJmk4AgnIM%252CHsI1fEQlUYE_GM%252C_%253BsIZKs8UShka4YM%252CYHndq2O-agi1ZM%252C_%253BZxz1esLhIqxzKM%252C7Ni1lEuoGZoKfM%252C_%253Bx-UjpLn9xq2aEM%252C4cFyqQlY2x5ALM%252C_%253B2pvwn-vHLpDuUM%252Cijvi5buMBOnWuM%252C_&usg=AI4_-kQu5WbwKB9oYuLikVhs579HW905Yw&sa=X&ved=2ahUKEwi19Y-hrYD3AhUNIDQIHZGoDb8QjJkEegQIAhAC&biw=1396&bih=656&dpr=1.38";
// let url = `https://www.rd.com/list/hedgehog-pictures/`
let url = `https://www.pinterest.ca/elenazhukova200/natural-images-hedgehogs/`

const scraper = new Scraper(url);

scraper.scrape((image) => {

    let addr = image.address;
    console.log(addr);

});

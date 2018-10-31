# JSON Database

I implement the .js variable version. The .json file is there as my gold standard refference file.

American english translation: [rosaryJSON-nab](myAssets/database/rosaryJSON-nab.json)

* The New American Bible
* [usccb.org](http://www.usccb.org/bible/books-of-the-bible/index.cfm)

St. Jerome's Latin translation 16th Century: [rosaryJSON-vulgate](myAssets/database/rosaryJSON-vulgate.json)

* The Vulgate Bible
* [vulgate.org](http://vulgate.org)

---

#### NAB re-translation stop point
All scripture quotes have been re-done. This update has introduced the need to re-curate the DB.

* After translating NAB to Vulgate i discovered a lot of discrepancies and mismatching quotes.
* i am going back and painstakingly going through the nab db and re-quoting and fixing what i catch
* this time i am just going to keep the full verse similar to what i did with the vulgate
* There are a lot of redundant duplicate quotes now. This need to be teased out to make the file size smaller.

##### Note:

My initial 'trial and error' db development was:
    1. an old pamphlet from the 1950's
    2. &#8627; odb spreadsheet  
    3. &#8627; css
    4. &#8627; MS Sql
    5. &#8627; MySql
    6. &#8627; Json
    7. &#8627; Misc Regex automating script
    8. &#8627; Web scraping attempts (trust but verify, sometimes...)
    9. &#8627; me and my typos ...

##### ramblings

At some point all the quotes got re-organized using all kinds of techniques. I think I scraped the NAB website at some point. It would have been faster just to do it the hard way first, but I thought this was just going to be a quick 1-2 week project.

---

#### If you want to curate your own scripture library:
* Just make sure the ```bead``` and ```scripture``` share remote indexing
* Each bead is matched with a scripture. you can mix and match as necessary
* You will need to make addition .js script of you want a ```bead``` to have multiple ```scripture``` pointers
    *   This is why is just crammed multiple verses into one
    *   To keep things clean, I still wrote in the exact scripture verse within each quote
* I recommend just purchasing the DB and work from one of those. Its big... but not that big.
    * My aim was to be be small.

# Database in JSON Form

Since this database is local and pretty much fixed, I am using the .js variable version.

American english translation: [rosaryJSON-nab](myAssets/database/rosaryJSON-nab.json)
* [usccb.org](http://www.usccb.org)

St. Jerome Latin translation 16th Century: [rosaryJSON-vulgate](myAssets/database/rosaryJSON-vulgate.json)
* [vulgate.org](http://vulgate.org)

---

#### NAB re-translation stop point
I have completed ```bookIndex```: 1 - 7.

* after translating nab to vulgate i discovered a lot of discrepancies and mismatching quotes.
* i am going back and painstakingly going through the nab db and re-quoting and fixing what i catch
* this time i am just going to keep the full verse similar to what i did with the vulgate

> note: my initial db was an:
    - an old pamphlet from the 1950's
    - --> odb spreadsheet  
    - --> css
    - --> MS Sql
    - --> MySql
    - --> Json
> At some point all the quotes got re-organized using all kinds of techniques. I think I scraped the NAB website at some point.

---

#### If you want to curate your own scripture library:
* just make sure the ```bead``` and ```scripture``` share remote indexing
* each bead is matched with a scripture. you can mix and match as necessary
* you will need to make addition .js script of you want a ```bead``` to have multiple ```scripture``` pointers
    *   this is why is just crammed multiple verses into one
    *   to keep things clean, I still wrote in the exact scripture verse within each quote

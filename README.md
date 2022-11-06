Setup
    npx create-next-app events-app
    npx next dev
        npm run build
        npm start

    update next.config.js to accomodate node.js
    
I.      components/inputs/newsletter-form.js            NewsletterForm

II.     pages/index.js                                  HomePage

III.    pages/api/newsletter.js                         function newsletter (req, res) 
        i.      write to /data/newsletter.json

IV.     HomePage 
            <NewsletterForm /> -> [Register] -> /api/newsletter 

V.      Comments
        pages/events/[eventid] (eventid) ->  components/input/Comments (eventid) ->  NewComment   
        -> pages/api/[eventid].js
        
        pages/events/[eventid] (eventid) -> components/input/Comments (eventid)  -> CommentList
        -> pages/api/index.js   

VI      API side validation
        i.  newsletter 

VII     Mongodb
        i.      npm i mongodb       const MongoClient = require('mongodb').MongoClient      
                                    MongoClient.connect(uri).then(client => client.db());
        ii.     pages/api/mongo/

        iii.    HomePage -> <NewsletterForm />  ->  /api/mongo/newsletter 




                                                                                               
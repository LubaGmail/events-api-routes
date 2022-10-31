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
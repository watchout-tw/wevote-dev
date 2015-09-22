var path = require('path')
var ghpages = require('gh-pages')

ghpages.clean();
ghpages.publish(path.join(__dirname, '../build'), { 
	branch: 'gh-pages'
}, console.log.bind(console))

const getBlogsPage = (request, response) => {
    return response.send("<h1>Hello from node-express server for blogs</h1>")
}

module.exports = {getBlogsPage} 
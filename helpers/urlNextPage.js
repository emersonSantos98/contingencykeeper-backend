

module.exports = {
    async nextPage (totalPages, page, pageSize, url) {
        return await  page < totalPages ? `${process.env.API_URL}:${process.env.PORT}/api/v1/${url}?page=${page + 1}&pageSize=${pageSize}` : null;
    }
}

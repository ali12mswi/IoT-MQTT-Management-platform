app.service('PaginationService', function () {
    var currentPage = 1;
    var pageSize = 10;

    this.getPages = function (totalItems) {
        var pages = [];
        var totalPages = Math.ceil(totalItems / pageSize);
        
        for (var i = 1; i <= totalPages; i++) {
            var page = {
                title: i,
                from: (i - 1) * pageSize,
                to: i * pageSize - 1,
                isLast: i === totalPages,
                isFirst: i === 1,
                isPrevious: i === currentPage - 1,
                isNext: i === currentPage + 1
            };
            pages.push(page);
        }

        return pages;
    };

    this.setCurrentPage = function (array,page) {

        return array.slice(page.from, page.to+1);
    };
});
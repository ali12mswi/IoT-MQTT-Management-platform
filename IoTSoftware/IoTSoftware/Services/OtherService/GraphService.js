app.service('GraphService', ['ModalService', 'GraphWebApiService', function (ModalService, GraphWebApiService) {

    this.addGraph= function (onGraphAdded) {
        var parameters = {
            itemID: null,
            title: 'Add Graph',
            callback: onGraphAdded,
            saveCallback: function (graph) {
                // Check if Name and Gender properties are defined and not empty
                
                    // Call API to add student
                    return GraphWebApiService.AddGraph(graph);
                
            }
        };

        return ModalService.showModal('/Services/Templates/GraphModal.html', editorBaseController, parameters).result
        console.log("is closed")
        // If the modal dialog was closed with a result, call the onStudentAdded callback if it's defined




    };

    this.editGraph = function (Graph, onGraphUpdated) {
        var parameters = {
            ID: Graph.Id,
            title: 'Edit Graph',
            callback: onGraphUpdated,
            saveCallback: function (Graph) {
                return GraphWebApiService.UpdateGraph(Graph)
            },
            data: Graph
        };

        return ModalService.showModal('/Services/Templates/GraphModal.html', editorBaseController, parameters).result;
    };
}]);


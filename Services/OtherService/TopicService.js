app.service('TopicService', ['ModalService', 'TopicWebApiService', function (ModalService, TopicWebApiService) {
    if (!TopicWebApiService) {
        throw new Error('$uibModalInstance is not defined');
    }
    this.addTopic = function (onTopicAdded) {
        var parameters = {
            itemID: null,
            title: 'Add Topic',
            callback:onTopicAdded,
            saveCallback: function (topic) {
                // Check if Name and Gender properties are defined and not empty
                if (topic.Name !== undefined  && topic.Name.trim() !== '') {
                    // Call API to add student
                    return TopicWebApiService.AddTopic(topic);
                }
            }
        };

        return ModalService.showModal('/Services/Templates/TopicModal.html', editorBaseController, parameters).result
            console.log("is closed")
            // If the modal dialog was closed with a result, call the onStudentAdded callback if it's defined
            
            
      

    };

    this.editTopic = function (Topic, onTopicUpdated) {
        var parameters = {
            ID: Topic.Id,
            title: 'Edit Topic',
            callback:onTopicUpdated,
            saveCallback: function (Topic) {
               
                return TopicWebApiService.UpdateTopic(Topic)


                
            },
            data: {
                Name: Topic.Name
                

            }
        };

        return ModalService.showModal('/Services/Templates/TopicModal.html', editorBaseController, parameters).result;
    };
}]);


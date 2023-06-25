app.service('RuleService', ['ModalService', 'RulesWebApiService', function (ModalService, RulesWebApiService) {
    if (!RulesWebApiService) {
        throw new Error('$uibModalInstance is not defined');
    }
    this.addRule = function (onRuleAdded) {
        var parameters = {
            itemID: null,
            title: 'Add Rule',
            callback: onRuleAdded,
            saveCallback: function (Rule) {
                // Check if Name and Gender properties are defined and not empty
                
                    // Call API to add student
                return RulesWebApiService.AddRule(Rule);
                
            }
        };

        return ModalService.showModal('/Services/Templates/RulesModal.html', editorBaseController, parameters).result
        console.log("is closed")
        // If the modal dialog was closed with a result, call the onStudentAdded callback if it's defined




    };

    this.editRule = function (Rule, onRuleUpdated) {
        var parameters = {
            ID: Rule.Id,
            title: 'Edit Rule',
            callback: onRuleUpdated,
            saveCallback: function (Rule) {
                // call API to update Universty


                // Call API to update student
                return RulesWebApiService.UpdateRule(Rule)



            },
            data: Rule


            
        };

        return ModalService.showModal('/Services/Templates/RulesModal.html', editorBaseController, parameters).result;
    };
}]);


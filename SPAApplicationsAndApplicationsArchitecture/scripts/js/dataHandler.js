var DataHandler = (function() {
    function DataHandler(applicationId, restAPIId) {
        this.setApplicationId(applicationId);
        this.setRestAPIId(restAPIId);
    }

    DataHandler.prototype.setApplicationId = function setApplicationId(applicationId) {
        this._applicationId = applicationId;
    };

    DataHandler.prototype.getApplicationId = function getApplicationId() {
        return this._applicationId;
    };

    DataHandler.prototype.setRestAPIId = function setRestAPIId(restAPIId) {
        this._restAPIId = restAPIId;
    };

    DataHandler.prototype.getRestAPIId = function getRestAPIId() {
        return this._restAPIId;
    };

    DataHandler.prototype.createObject = function addObject(className, data) {
        var deferred = Q.defer();

        $.ajax({
            method: 'POST',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (newObject) {
                deferred.resolve(newObject);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    };

    DataHandler.prototype.deleteObject = function deleteObject(className, objectId) {
        var defered = Q.defer();

        $.ajax({
            method: 'DELETE',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId,
            success: function (deletedObject) {
                defered.resolve(deletedObject);
            },
            error: function (error) {
                defered.reject(error);
            }
        });

        return defered.promise;
    };

    DataHandler.prototype.updateObject = function updateObject(className, objectId, data) {
        var deferred = Q.defer();

        $.ajax({
            method: 'PUT',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (updatedObject) {
                deferred.resolve(updatedObject);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    };

    DataHandler.prototype.getData = function getData(className, objectId) {
        var deferred = Q.defer();

        $.ajax({
            method: 'GET',
            headers: {
                "X-Parse-Application-Id": this.getApplicationId(),
                "X-Parse-REST-API-Key": this.getRestAPIId()
            },
            url: 'https://api.parse.com/1/classes/' + className + '/' + objectId,
            success: function (data) {
                deferred.resolve(data.results);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    };

    return DataHandler;
})();
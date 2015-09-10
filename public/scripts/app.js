var plannerApp = angular.module("plannerApp" , ['angular-cache','ngSanitize']);

plannerApp.config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 3600000,
        deleteOnExpire: 'aggressive',
        onExpire: function (key, value) {
          var _this = this; // "this" is the cache in which the item expired
          angular.injector(['ng']).get('$http').get(key).success(function (data) {
            _this.put(key, data);
          });
        }
  });
});
plannerApp.directive("contenteditable", ["$sce" , function( $sce ) {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue( element.text() );
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
}]);

plannerApp.directive("listLoadComplete" ,["$rootScope", function($rootScope) {
  return {
      restrict: 'A',
      controller: 'taskController',
      link : function (scope, element, attr) {
        scope.$watch('tasks', function(ov , nv){
            var ListHeight = $(".list").height();
            scope.$emit('list-loaded', ListHeight);            
        });
        scope.$watch('criteria', function(ov , nv){
            var ListHeight = $(".list").height(); 
            scope.$emit('search-updated', ListHeight);     
        });
          
       $rootScope.$on("list-updated", function(event,added){ //check $rootscope for change
           var ListHeight = $(".list").height();
           
           if(added !== undefined && added){
               ListHeight = ListHeight + 48;
           }else if(added !== undefined &&  !added){
               ListHeight = ListHeight - 48;
           }
           $(".lines").css("min-height" , ListHeight+"px");
       });
      }      
  };
}]);

plannerApp.service("taskService" , ["CacheFactory","$http","$q" , function (CacheFactory,$http, $q) {   
    var ListArray = { "userList" :["testing"]} ;
    var _getCachedTaskList = function(){
     var taskCache ;
        if (!CacheFactory.get('taskCache')) {
          // or CacheFactory('bookCache', { ... });
            taskCache =  CacheFactory.createCache('taskCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
              });
        }

        taskCache = CacheFactory.get('taskCache');
        return taskCache;
    };
    
    var _getCachedList = function(){      
       return  $http.get('/api/items', ListArray)
        .success(function(data) {
            ListArray = data[0].userList;
        });  
    };
    
    var _updateListCache = function(ListDescription){
      /*  var _listCache = _getCachedTaskList();
        var array = ListArray.userList;
        array.push(ListDescription);
        ListArray.userList = array;
        _listCache.put("taskList" , ListArray);*/
        var json = {"value": ListDescription};
         return  $http.post('/api/updateItems', json)
        .success(function(data) {
            ListArray = data[0].userList;
        }); 
    };
    
   var _deleteTaskFromCache = function(value){
      /*  var _listCache = _getCachedTaskList();
        var array = ListArray.userList;
        array.splice(index ,1);
        ListArray.userList = array;
        _listCache.put("taskList" , ListArray);*/
       
       var json = {"value": value};
         return  $http.post('/api/deleteItem', json)
        .success(function(data) {
            ListArray = data[0].userList;
        }); 
   }

   var _updateTaskListAtIndex = function(index , value ){
     /*   var _listCache = _getCachedTaskList();
        var array = ListArray.userList;
        array[index] = value;
        ListArray.userList = array;
        _listCache.put("taskList" , ListArray);*/
       return  $http.post('/api/updateItems', value)
        .success(function(data) {
            ListArray = data[0].userList;
        }); 
       
   };
    
    return {
        getCachedTaskList : _getCachedList,
        updateTaskListCache : _updateListCache,
        deleteTaskFromCache : _deleteTaskFromCache,
        updateTaskListAtIndex :_updateTaskListAtIndex
    };

}]);

plannerApp.controller("taskController" , ["$scope" , "$rootScope", "taskService" , function( $scope , $rootScope , taskService){    
    $scope.addTask = function(descriptionValue){
      if(descriptionValue === undefined || descriptionValue == ""){
          return false;
      }else{        
          taskService.updateTaskListCache($scope.description).then(function(data) {
            $scope.tasks = data.data[0];
          });
          $scope.description = "";
          $scope.$parent.$emit("list-updated", true);    //$scope.$parent is equivalent to $rootscope[$scope.emit is not catched for sibling scopes as in this case ]
      }
    };   
  
  
    /*For Editing the code */
    
    $scope.editorEnabled = false;
  
    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editableTitle = $scope.title;
    };

    $scope.disableEditor = function() {
       $scope.editorEnabled = false;
    };

    $scope.save = function() {
        $scope.title = $scope.editableTitle;
        $scope.disableEditor();
    };
    
   /*End of conteneditbale handling */ 
    $scope.markDone = function(index) {
        if($(".list li:eq("+index+") .status input:checked").is(':checked')){            
            $(".list li:eq("+index+") .description").css("text-decoration" , "line-through") ;   
        }else{
             $(".list li:eq("+index+") .description").css("text-decoration" , "none") ;   
        }
    }
    
    
    $scope.updateTask = function(index){      
      taskService.updateTaskListAtIndex(index , $scope.taskEditValue);
      $scope.$parent.$emit("list-updated", true);     //$scope.$parent is equivalent to $rootscope[$scope.emit is not catched for sibling scopes as in this case ]
    };
     $scope.deleteTask = function(value){
         
     taskService.deleteTaskFromCache(value).then(function(data) {
        $scope.tasks = data.data[0];
      });    
       $scope.$parent.$emit("list-updated" ,false);    //$scope.$parent is equivalent to $rootscope[$scope.emit is not catched for sibling scopes as in this case ]
    };
    
    $scope.$on('list-loaded', function(event, height){
        $(".lines").css("min-height" , height+"px");
    });
    
    $scope.$on('search-updated', function(event, height){
        $(".lines").css("min-height" , height+"px");
    });
   
    
   var loadList = function(){
       taskService.getCachedTaskList().then(function(data) {
            $scope.tasks = data.data[0];
       });
   }
   
   loadList();
   
}]);
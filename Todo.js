    angular.module("ToDo",[])
    .controller("todoController", function($scope){
        $scope.saved = localStorage.getItem('todos');
        $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ ];
        localStorage.setItem('todos', JSON.stringify($scope.todos));

        $scope.addTodo = function() {
            $scope.todos.push({
                text: $scope.todoText,
                done: false
            });
            $scope.todoText = ''; //clear the input after adding
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        };

        $scope.delete = function(){
            $scope.todos.splice(this.$index,1);
            localStorage.setItem('todos', JSON.stringify($scope.todos));
        }

        $scope.clearCompleted = function(){
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo){
                if (!todo.done)
                    $scope.todos.push(todo);
            });

            localStorage.setItem('todos', JSON.stringify($scope.todos));
        }
        $scope.undone = function(){
            $scope.todos = $scope.todos.filter(function(item){
                return !item.done
            })

        }

    })
    .directive('todoItem', function(){
            return{
                scope : false,
                restrict: 'E',
                templateUrl : 'todo-item.html'
            }
        })

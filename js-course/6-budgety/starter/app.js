///BUDGET CONTROLLER
//below is an example of closure and IIFE
var budgetController = (function(){
    
    //capital means function constructor
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        
        if(totalIncome > 0){
            this.percentage = Math.round((this.value/totalIncome)*100);
        }else{
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function(){
        
        return this.percentage;
    };
      
    //capital means function constructor
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        
        var sum = 0;
        data.allItems[type].forEach(function(current){
           
            sum += current.value;
            
        });
        
        data.totals[type] = sum;
        
    };
    
    var data = {
        
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
        
    };
    
    return  {
        addItem: function(type, des, val){
            
            var newItem, ID; 
            
            console.log(data.allItems[type]);
            
            if(data.allItems[type].length > 0){
                //create new id  
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
                
            }else{ 
                ID = 0;
            }
            
            //create new item based on inc or exp type
            if(type === 'expense'){
                
                newItem = new Expense(ID, des, val);
                
            }else if(type === 'income'){
                
                newItem = new Income(ID, des, val);
            }            
            
            //puch it into the ds and return
            data.allItems[type].push(newItem);
            return newItem;
        },
        
        deleteBudget: function(type, id){
          
            //id = 6
            //will not work
            //data.allItems[type][id];
            
            // ids = [ 1 2 3 4 6 8]
            //index = 3
            
            var ids, index;
            ids = data.allItems[type].map(function(current){
               
                //map returns a brand new array
                return current.id;
                
            });
            
            index = ids.indexOf(id);
            
            //delete from array
            //if item not found index = -1;
            if(index !== -1){
                //delete
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget: function(){
          
            // calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');
            
            // calc the budget => income - exp
            data.budget = data.totals.income - data.totals.expense;
            
            // calc the %age of income we spent
            if(data.totals.income > 0){
                data.percentage = Math.round((data.totals.expense/data.totals.income) * 100);
            }
        },
        
        calculatePercentages: function(){
            
            //need a prptotype method so that to have it in each object
            //call it for each expense object
            data.allItems.expense.forEach(function(current){
                
                current.calcPercentage(data.totals.income);
                
            });
            
        },
        
        getPercentages: function(){
            
            //map returns ans stores
            var allPercentages = data.allItems.expense.map(function(current){
                
                return current.getPercentage();
            });
            return allPercentages;
        },
         
        getBudget:  function(){
            
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpenses: data.totals.expense,
                percentage: data.percentage
            }
            
        },
        
        testing: function(){
            console.log(data);
        }
        
        
    };
    
})();



//ui controller
var uiController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        totalIncome: '.budget__income--value',
        totalExpenses: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    
    //private 
    var formatNumber = function(num, type){
          
        var numSplit, int, dec, type;
        /*
            + or - before a number
            exactly 2 decimal points
            comma separating thousands: 
            1000 -> 1,000
            23.1129 -> 23.11
        */

        num = Math.abs(num);
        //for 2 decimal places after decimal
        // JS will convert num from Promitive to object, like wrapper class like in Java int and Integer

        //tjhe below method returns string
        num = num.toFixed(2);

        //comma sep 1000

        //splittign into decmal and integer part
        numSplit = num.split('.'); 

        //below returns string
        int = numSplit[0];

        //add comma for 1000
        if(int.length > 3){
            //start at pos 0 and read 1 element
            int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3); // 2310 -> 2,310

        }

        dec = numSplit[1];

        return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec; 
    };
    
     var nodeListForEach = function(list, callback){

        for(var i = 0; i < list.length; i++){
            //the below nodeListForEach(current, index) funciton
            callback(list[i], i);

        }

    };
            
    
    return {
        //object
        getinput: function(){
            
            return {
                //inc or exp
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }; 
        },
        
        addListItem: function(obj, type){
            
            var html, newHtml, element;
            //create an html sring with placeholder text
            
            if(type === 'income'){
                
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id% "><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            }else
                if(type === 'expense'){
                    
                    element = DOMstrings.expensesContainer;
            
                    html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                    
                   }
            
            //replace the placeholder text with actual data
            
            console.log("obj: " + obj.val);
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: function(selectorID){
            
           var el = document.getElementById(selectorID);
           el.parentNode.removeChild(el);
            
        },
        
        //another public method
        clearFields: function(){
            
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
               
                current.value = "";
                
            });
            
            fieldsArr[0].focus();
            
        },
        
        displayBudget: function(obj){
            
            var type;
            obj.budget > 0 ? type = 'income' : type = 'expense';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.totalIncome).textContent = formatNumber(obj.totalIncome, 'income');
            document.querySelector(DOMstrings.totalExpenses).textContent = formatNumber(obj.totalExpenses, 'expense');
            
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentage).textContent = obj.percentage + '%';
            }else{
                 document.querySelector(DOMstrings.percentage).textContent = '---';
            }
            
        },
        
        displayPercentages: function(percentages){
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current,  index){
                
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';
                }
            });
            
        },
        
        displayMonth: function(){
            
            var now, year, month;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 26);
            
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
             
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
            
        },
        
        changedType: function(){
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue
            );
            
            //above will return nodeList
            
            //loop over it
            nodeListForEach(fields, function(current){
               
                //tpoggle chageds the current state, there r not there
                current.classList.toggle('red-focus');
                
            });
            
            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
            
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        }
        
    };   
    
})();



//global app controller
var controller = (function(budgetCtrl, uiCtrl){
    //diff name in parameter, so as to et changes occur smoothly in future
    
    var setupEventListeners = function(){
        
        var DOM = uiCtrl.getDOMstrings();

        //event-listener for input button
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        //anywhere in the doc
        document.addEventListener('keypress', function(event){
            //do something when user pressed return/enter key
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem(); 
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType  )
        
    };
    
    var updateBudget = function(){
      
        //1. calc the budget
        budgetCtrl.calculateBudget();
        
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        
        //3. display the budget on the UI
        uiCtrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function(){
        
        //1. calculate the %ages
         budgetCtrl.calculatePercentages();
        
        //2. read then from budget ctrl
        var percentages = budgetCtrl.getPercentages();
        
        //3. update the UI witht he new %ages
        uiCtrl.displayPercentages(percentages);
         
        
    };
        
    var ctrlAddItem = function(){
            
        var input, newItem;
        
        //1. Get the input data
        input = uiCtrl.getinput();
        console.log(input); 
        
        if(input.description !== "" && !(isNaN(input.value))){

            //2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the new item to the user interface as well
            uiCtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            uiCtrl.clearFields();

            //5. Calculate and update the budget.
            updateBudget();

            //6. calc and update the %ages
            updatePercentages();
            
        }
    };
    
    var ctrlDeleteItem = function(event){
        
        //DOM traversing
        var itemID, splitID, type, ID;
        itemID=  event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];    
            
            //1. Delete the item from the data structure
            budgetCtrl.deleteBudget(type, ID);
            
            //2. Delete the item from the UI
            uiCtrl.deleteListItem(itemID);
            
            //3. Update and show the new budget
            updateBudget();
            
            //6. Calculate and update percentages
            updatePercentages();
            
        }
        
        
    };
    
    return {
        init: function(){
            console.log('Application has started!');
            //to let things initilize
            uiController.displayMonth();
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
    
})(budgetController, uiController);


controller.init();
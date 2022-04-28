var taskArray = []

//display current date in header
$("#currentDay").text(moment().format('dddd, MMMM Do'));

//click to edit
// $(".container").on("click","p", function() {
//     console.log("edit task");
//     var text = $(this).text().trim();
//     // create input area
//     var textInput = $("<textarea>").addClass("description").val(text);

//     $(this).replaceWith(textInput);
// });

// $(".description").on("blur", "textarea", function () {
//     console.log("finish editing task");
//     // get the textarea's current value/text
//     var text = $(this)
//       .val()
//       .trim();
    
//     var newTask = $("<p>").addClass("description").val(text);

//     $(this).replaceWith(newTask);
// });


var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

var loadTasks = function() {
  //get tasks from local storage
  var savedTasks = localStorage.getItem("tasks");

  // if nothing in localStorage, create a new array to hold tasks
  if (!savedTasks) {
    taskArray = [];
    return false;
  }

  // parse tasks and push to array
  savedTasks = JSON.parse(savedTasks);
  for (i=0; i < savedTasks.length; i++) {
    taskArray.push(savedTasks[i]);
    var blockId = ".block-" + savedTasks[i].id;
    var text = savedTasks[i].content;
    $(blockId).children("textarea").replaceWith("<p>");
  };

};


//save button is clicked
$(".saveBtn").on("click", function() {
  //get updated task value
  var text = $(this).siblings("textarea").val().trim();

  //get task id
  var taskId = $(this).closest("article").attr("id").replace("block-", "");

  //create obj to store task
  var taskObj = {
    id: taskId,
    content: text,
  };

  taskArray.push(taskObj);
  saveTasks();
})

loadTasks();
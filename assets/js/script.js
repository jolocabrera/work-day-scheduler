var taskArray = []

//display current date in header
$("#currentDay").text(moment().format('dddd, MMMM Do'));


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
  
  // parse tasks and push to array and display saved tasks on schedule
  savedTasks = JSON.parse(savedTasks);
  for (i=0; i < savedTasks.length; i++) {
    taskArray.push(savedTasks[i]);
    var time = savedTasks[i].time;
    var text = savedTasks[i].content;
    $(".textbox-"+time).val(text)
  };

};

//verify if time block has passed, is current, or is in the future
var auditTask = function(taskEl) {
  //get time of block
  var hour = $(taskEl).parent("article").attr("time");

  //convert to moment object 
  var time =moment().set("hour",hour)

  //remove past present future classes from description
  $(taskEl).removeClass("past present future");


  //apply new class if task is past, current, or future
  if(moment().isBefore(time,"hour")) {
    $(taskEl).addClass("future");
  }
  else if (moment().isAfter(time,"hour")) {
    $(taskEl).addClass("past");
  }
  else {
    $(taskEl).addClass("present");
  }
}

var runAudit = function() {
  $(".description").each(function(index,el) {
    auditTask(el);
  });
}

//check hour every 30 mins
setInterval(runAudit, (1000 * 60) * 30);


//save button is clicked
$(".saveBtn").on("click", function() {
  //get updated task value
  var text = $(this).siblings("textarea").val().trim();

  //get task id
  var taskId = $(this).closest("article").attr("time")

  //create obj to store task
  var taskObj = {
    time: taskId,
    content: text,
  };

  //check if there is an object in the array with the same ID
  var index = taskArray.findIndex(task => task.time === taskId);
  
  if (index < 0) {
    taskArray.push(taskObj);
  saveTasks();
  }
  else {
    taskArray.splice(index,1)
    taskArray.push(taskObj);
    saveTasks();
  }


})


loadTasks();
runAudit();
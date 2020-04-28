'use strict';

export function run(tasks, maxNumOfWorkers = 4) {
  var numOfWorkers = 0;
  var taskIndex = 0;

  return new Promise(done => {
    var results = [];
    
    const handleResult = (index, hasError) => result => {
      if (!hasError) {
        results.push(result);
      }
      tasks[index] = result;
      numOfWorkers--;
      
      getNextTask();
    };
    const getNextTask = () => {
      if (numOfWorkers < maxNumOfWorkers && taskIndex < tasks.length) {
        tasks[taskIndex]().then(handleResult(taskIndex, false)).catch(handleResult(taskIndex, true));
        taskIndex++;
        numOfWorkers++;
        getNextTask();
      } else if (numOfWorkers === 0 && taskIndex === tasks.length) {
        done(results);
      }
    };
    getNextTask();
  });
}
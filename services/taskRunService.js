import TaskRun from '../models/taskRunModel.js';

const createTaskRun = async (data) => {
  const taskRun = new TaskRun(data);
  await taskRun.save();
  console.log('TaskRun saved:', taskRun);
};

export { createTaskRun };

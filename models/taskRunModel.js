import mongoose from 'mongoose';

const taskRunSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  runtime: Number,
  filesAdded: [String],
  filesDeleted: [String],
  magicStringOccurrences: Number,
  status: String,
});

const TaskRun = mongoose.model('TaskRun', taskRunSchema);

export default TaskRun;

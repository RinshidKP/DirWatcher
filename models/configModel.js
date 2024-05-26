// models/configModel.js
import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  monitoredDirectory: {
    type: String,
    required: true,
  },
  magicString: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
});

const Config = mongoose.model('Config', configSchema);

export default Config;

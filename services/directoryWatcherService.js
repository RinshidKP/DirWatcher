import chokidar from 'chokidar';
import path from 'path';
import { createTaskRun } from './taskRunService.js';
import Config from '../models/configModel.js';
import fs from 'fs';

let watcher;
let monitoredDirectory;
let magicString;
let interval;

const loadConfig = async () => {
  let config = await Config.findOne();
  if (!config) {
    config = new Config({
      monitoredDirectory: 'Performance/logs',
      magicString: 'magic',
      interval: '*/5 * * * *',
    });
    await config.save();
  }

  monitoredDirectory = config.monitoredDirectory;
  magicString = config.magicString;
  interval = config.interval;

  if (watcher) {
    watcher.close();
  }
  startWatching();
};

const startWatching = () => {
  watcher = chokidar.watch(monitoredDirectory, { persistent: true });
  watcher.on('all', async (event, filePath) => {
    if (['add', 'change', 'unlink'].includes(event)) {
      await monitorDirectory(event, filePath);
    }
  });

  console.log(`[${new Date().toLocaleString()}] Watching for folder changes on: ${monitoredDirectory}`);
};

const monitorDirectory = async (event, filePath) => {
  const startTime = new Date();

  // Initialize arrays to keep track of added and deleted files
  const filesAdded = [];
  const filesDeleted = [];

  if (event === 'add') {
    filesAdded.push(path.basename(filePath));
  } else if (event === 'unlink') {
    filesDeleted.push(path.basename(filePath));
  }

  // Read files in the directory
  const files = fs.readdirSync(monitoredDirectory);

  // Count magic string occurrences
  let magicStringOccurrences = 0;
  files.forEach((file) => {
    const content = fs.readFileSync(path.join(monitoredDirectory, file), 'utf8');
    magicStringOccurrences += (content.match(new RegExp(magicString, 'g')) || []).length;
  });

  // Save task run details to the database
  const endTime = new Date();
  const runtime = endTime - startTime;
  const taskRunData = {
    startTime,
    endTime,
    runtime,
    filesAdded,
    filesDeleted,
    magicStringOccurrences,
    status: 'success',
  };
  await createTaskRun(taskRunData);
};

loadConfig();

const getConfig = async () => {
  return await Config.findOne();
};

const updateConfig = async ({ directory, magic, cronInterval }) => {
  let config = await Config.findOne();
  if (!config) {
    config = new Config({
      monitoredDirectory: directory,
      magicString: magic,
      interval: cronInterval,
    });
  } else {
    if (directory) config.monitoredDirectory = directory;
    if (magic) config.magicString = magic;
    if (cronInterval) config.interval = cronInterval;
  }
  await config.save();
  await loadConfig();
};

export default { getConfig, updateConfig };

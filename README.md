# DirectoryWatcher API

DirectoryWatcher is an API server that monitors a specified directory for file changes, counts occurrences of a specified string in the files, and logs the details of each monitoring run.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You will need Node.js version 14 or later. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: You will need a MongoDB instance. You can use a local instance or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Git**: Ensure you have Git installed. You can download it from [git-scm.com](https://git-scm.com/).

## Installation

Follow these steps to set up and run the project:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/RinshidKP/DirWatcher.git
    cd DirectoryWatcher
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory of your project and add the following environment variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ```
    Replace `your_mongodb_connection_string` with the actual connection string to your MongoDB instance.

4. **Run the server**:
    ```sh
    npm start
    ```

    You should see a message indicating that the server has started on the specified port.

## API Endpoints

### Get Configuration
- **URL**: `/path/config`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "monitoredDirectory": "Performance/logs",
      "magicString": "magic",
      "interval": "*/5 * * * *"
    }
    ```
- **Description**: Fetches the current monitoring configuration.

### Update Configuration
- **URL**: `/path/config`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "directory": "new/directory/path",
      "magic": "newMagicString",
      "cronInterval": "*/10 * * * *"
    }
    ```
- **Response**:
    ```json
    {
      "message": "Configuration updated successfully"
    }
    ```
- **Description**: Updates the monitoring configuration.

### Get Task Runs
- **URL**: `/api/task-runs`
- **Method**: `GET`
- **Response**:
    ```json
    [
      {
        "startTime": "2023-05-01T12:00:00.000Z",
        "endTime": "2023-05-01T12:05:00.000Z",
        "runtime": 300000,
        "filesAdded": ["newFile.txt"],
        "filesDeleted": ["oldFile.txt"],
        "magicStringOccurrences": 5,
        "status": "success"
      }
    ]
    ```
- **Description**: Retrieves the log of all task runs.

## Database Schema

Here is the database schema for the DirectoryWatcher API:

![Database Schema](https://drive.google.com/file/d/1vllRwP0uWW94SOJghCmZOzp7n9FF3_Nq/view?usp=sharing)

### Tables

- **Config**
  - `id`: Integer, Primary Key, Auto-increment
  - `monitored_directory`: String, Directory to be monitored
  - `magic_string`: String, String to search for in files
  - `interval`: String, Cron interval for monitoring

- **TaskRun**
  - `id`: Integer, Primary Key, Auto-increment
  - `start_time`: Timestamp, Task start time
  - `end_time`: Timestamp, Task end time
  - `runtime`: Integer, Runtime in milliseconds
  - `files_added`: Text, JSON array of files added
  - `files_deleted`: Text, JSON array of files deleted
  - `magic_string_occurrences`: Integer, Number of times the magic string appears
  - `status`: String, Status of the task run (success/failed)

## Error Handling

The API uses a global error handler to manage errors gracefully. Errors are logged, and the API responds with appropriate status codes and messages.

## Contributing

If you have suggestions for improving this project, please fork the repository and create a pull request. Alternatively, open an issue in the repository.

## License

This project is open-source and available under the MIT License.

## Contact

If you have any questions, feel free to reach out to me at [rinshid26@gmail.com](mailto:rinshid26@gmail.com).


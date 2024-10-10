## MOVIE SERVICE API

## Setup
1. **Clone the Repository:**

    Clone the project repository from the provided URL using the following command:
    ```bash 
    git clone https://github.com/aripbudiman007/Service-Movie.git
    ```
2. **Install Dependencies:**

    Navigate to the project folder using the terminal:
    ```bash
    cd Service-Movie/
    ```
    Install the project dependencies using npm or yarn (we recommend using npm for this example):
    ```bash
    npm install
    ```
3. **Setup Database Configuration:**
    Open the `config/config.json` file in your preferred code editor. Configure the database settings for development, test, and production environments. Adjust the `username`, `password`, `database`, `host`, and `dialect` according to your PostgreSQL setup:
    ```json
      {
        "development": {
          "username": "postgres",
          "password": "123456",
          "database": "db_movie",
          "host": "127.0.0.1",
          "dialect": "postgres",
          "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at"
          }
        },
        "test": {
          "username": "postgres",
          "password": "123456",
          "database": "db_movie_test",
          "host": "127.0.0.1",
          "dialect": "postgres",
          "logging": false,
          "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at"
          }
        },
        "production": {
          "username": "root",
          "password": null,
          "database": "database_production",
          "host": "127.0.0.1",
          "dialect": "mysql"
        }
      }
    ```
4. **Run Database Migrations:**

    Apply database migrations to set up the required database tables. Execute the following command:
    ```bash
    sequelize db:migrate
    ```
5. **Run Development Mode**
    
    Start the application in development mode using the following command:
    ```
    npm run dev
    ```

6. **API Documentation**

    API Docs URL:
    ```
    http://localhost:3000/api-docs
    ```    

7. **Run Tests:**

    Pre Setup DB Testing
    ```
    npm setup:test
    ```

    Ensure that everything is set up correctly by running the tests:
    ```bash
    npm test
    ```
    This command will execute the tests and provide feedback on the success or failure of each test case.

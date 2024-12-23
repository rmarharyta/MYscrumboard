using MY_ScrumBoard.Models;
using MySql.Data.MySqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MY_ScrumBoard.Services
{
    public class UserServices
    {
        static MySqlConnection connection = ConnectionSingleton.GetInstance().Connection;
        public static void PostUser(Users user)
        {
            string query = "INSERT INTO Users(userId, email, userPassword) VALUES(UUID(),@email, @userPassword);";

            connection.Open();

            var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@email", user.email);
            command.Parameters.AddWithValue("@userPassword", user.userPassword);

            command.ExecuteNonQuery();
            connection.Close();
        }

        public static void DeleteUser(string userId)
        {
            string query = "DELETE  FROM Users WHERE userId=@userId;";

            connection.Open();

            var command = new MySqlCommand(query, connection);

            command.Parameters.AddWithValue("@userId", userId);
            command.ExecuteNonQuery();
            connection.Close();
        }

        public static void PutUser(Users user)
        {
            string query = "SELECT * FROM Users(userId, email, userPassword) VALUES(UUID(),@email, @userPassword);";

            connection.Open();

            var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@email", user.email);
            command.Parameters.AddWithValue("@userPassword", user.userPassword);

            command.ExecuteNonQuery();
            connection.Close();
        }
    }
    }
}

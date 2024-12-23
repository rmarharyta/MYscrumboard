using MySql.Data.MySqlClient;

namespace MY_ScrumBoard.Models
{
    public class ConnectionSingleton
    {
        static string connectionString = "Server=localhost;Database=MyScrumDb;User=root;Password=SUTE_Marharyta_10;";
        public MySqlConnection Connection { get; }

        static ConnectionSingleton singleton;


        private ConnectionSingleton()
        {
            Connection = new MySqlConnection(connectionString);
        }


        public static ConnectionSingleton GetInstance()
        {
            if (singleton == null)
            {
                singleton = new ConnectionSingleton();
            }
            return singleton;

        }
    }
}

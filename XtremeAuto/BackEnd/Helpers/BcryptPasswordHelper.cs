namespace BackEnd.Helpers
{
    using Bcrypt = BCrypt.Net.BCrypt;

    public class BcryptPasswordHelper {

        //public string[] HashPassword(string password) {
           
        //    string hashedPassword = Bcrypt.HashPassword(password, salt);
        //    string[] array= new string[2];
        //    array[0]=hashedPassword;
        //    array[1]=salt;
        //    return array;
        //}

        public string HashPassword(string password)
        {
            string salt = Bcrypt.GenerateSalt();
            string hashedPassword = Bcrypt.HashPassword(password, salt);
            return hashedPassword;
        }

        public bool VerifyPassword(string password, string hashedPassword) {
            return Bcrypt.Verify(password, hashedPassword);
        }
	}
}
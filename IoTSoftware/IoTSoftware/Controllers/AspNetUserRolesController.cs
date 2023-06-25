using IoTSoftware.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Web.Http;

namespace IoTSoftware.Controllers
{
    public class AspNetUserRolesController : ApiController
    {
        private readonly string _connectionString;

        public AspNetUserRolesController()
        {
            // Replace with your actual connection string
            _connectionString = ConfigurationManager.ConnectionStrings["cs"].ConnectionString;
        }

        // POST api/AspNetUserRoles/{userId}/role
        [HttpPost]
        public async Task<IHttpActionResult> AddUserToRole(UserRole user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Check if the user exists
                using (var checkUserCommand = new SqlCommand("SELECT COUNT(*) FROM AspNetUsers WHERE Id = @UserId", connection))
                {
                    checkUserCommand.Parameters.AddWithValue("@UserId", user.userId);
                    var userExists = (int)await checkUserCommand.ExecuteScalarAsync();

                    if (userExists == 0)
                    {
                        return NotFound();
                    }
                }

                // Check if the role exists
                using (var checkRoleCommand = new SqlCommand("SELECT COUNT(*) FROM AspNetRoles WHERE Name = @RoleName", connection))
                {
                    checkRoleCommand.Parameters.AddWithValue("@RoleName", user.roleName);
                    var roleExists = (int)await checkRoleCommand.ExecuteScalarAsync();

                    if (roleExists == 0)
                    {
                        return NotFound();
                    }
                }

                // Check if the user is already in the role
                using (var checkUserRoleCommand = new SqlCommand("SELECT COUNT(*) FROM AspNetUserRoles WHERE UserId = @UserId", connection))
                {
                    checkUserRoleCommand.Parameters.AddWithValue("@UserId", user.userId);
                    var userRoleExists = (int)await checkUserRoleCommand.ExecuteScalarAsync();

                    if (userRoleExists > 0)
                    {
                        // User is already assigned to a role, update the role
                        using (var updateUserRoleCommand = new SqlCommand("UPDATE AspNetUserRoles SET RoleId = (SELECT Id FROM AspNetRoles WHERE Name = @RoleName) WHERE UserId = @UserId", connection))
                        {
                            updateUserRoleCommand.Parameters.AddWithValue("@UserId", user.userId);
                            updateUserRoleCommand.Parameters.AddWithValue("@RoleName", user.roleName);

                            await updateUserRoleCommand.ExecuteNonQueryAsync();
                        }

                        return Ok(); // Return a successful response indicating the role was updated
                    }
                }

                // Add the user to the role
                using (var addUserToRoleCommand = new SqlCommand("INSERT INTO AspNetUserRoles (UserId, RoleId) VALUES (@UserId, (SELECT Id FROM AspNetRoles WHERE Name = @RoleName))", connection))
                {
                    addUserToRoleCommand.Parameters.AddWithValue("@UserId", user.userId);
                    addUserToRoleCommand.Parameters.AddWithValue("@RoleName", user.roleName);

                    await addUserToRoleCommand.ExecuteNonQueryAsync();
                }
            }

            return Ok(); // Successful insertion
        }

        [HttpGet]
        public async Task<List<UserDetail>> GetUserDetails(string roleNameFilter)
        {
            var userDetails = new List<UserDetail>();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = "SELECT U.Id, U.UserName, R.Name AS RoleName " +
            "FROM AspNetUsers U " +
            "LEFT JOIN AspNetUserRoles UR ON U.Id = UR.UserId " +
            "LEFT JOIN AspNetRoles R ON UR.RoleId = R.Id";


                if (!string.IsNullOrEmpty(roleNameFilter))
                {
                    query += " WHERE R.Name = @RoleName";
                }

                using (var command = new SqlCommand(query, connection))
                {
                    if (!string.IsNullOrEmpty(roleNameFilter))
                    {
                        command.Parameters.AddWithValue("@RoleName", roleNameFilter);
                    }

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            try
                            {
                                var userId = reader.IsDBNull(reader.GetOrdinal("Id")) ? null : reader.GetString(reader.GetOrdinal("Id"));
                                var userName = reader.IsDBNull(reader.GetOrdinal("UserName")) ? null : reader.GetString(reader.GetOrdinal("UserName"));
                                var roleName = reader.IsDBNull(reader.GetOrdinal("RoleName")) ? null : reader.GetString(reader.GetOrdinal("RoleName"));

                                var userDetail = new UserDetail
                                {
                                    Id = userId,
                                    UserName = userName,
                                    RoleName = roleName
                                };

                                userDetails.Add(userDetail);
                            }
                            catch (Exception ex)
                            {
                                // Handle the exception or log it
                                Console.WriteLine("An error occurred while reading data: " + ex.Message);
                            }
                        }

                    }
                }
            }

            return userDetails;
        }

        // DELETE api/AspNetUserRoles/{userId}/role/{roleId}
        [HttpPost]
        public async Task<IHttpActionResult> RemoveUserFromRole(string userId, string roleId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                // Check if the user exists
                using (var checkUserCommand = new SqlCommand("SELECT COUNT(*) FROM AspNetUsers WHERE Id = @UserId", connection))
                {
                    checkUserCommand.Parameters.AddWithValue("@UserId", userId);
                    var userExists = (int)await checkUserCommand.ExecuteScalarAsync();

                    if (userExists == 0)
                    {
                        return NotFound();
                    }
                }

                // Check if the role exists
                using (var checkRoleCommand = new SqlCommand("SELECT COUNT(*) FROM AspNetRoles WHERE Id = @RoleId", connection))
                {
                    checkRoleCommand.Parameters.AddWithValue("@RoleId", roleId);
                    var roleExists = (int)await checkRoleCommand.ExecuteScalarAsync();

                    if (roleExists == 0)
                    {
                        return NotFound();
                    }
                }

                // Remove the user from the role
                using (var removeUserFromRoleCommand = new SqlCommand("DELETE FROM AspNetUserRoles WHERE UserId = @UserId AND RoleId = @RoleId", connection))
                {
                    removeUserFromRoleCommand.Parameters.AddWithValue("@UserId", userId);
                    removeUserFromRoleCommand.Parameters.AddWithValue("@RoleId", roleId);

                    await removeUserFromRoleCommand.ExecuteNonQueryAsync();
                }
            }

            return Ok(); // Successfully removed user from role
        }
    }
}

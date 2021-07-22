using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using RepairTrack.Models;
using RepairTrack.Utils;
using Microsoft.Data.SqlClient;
using RepairTrack.Repositories;

namespace Tabloid.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, 
                               up.Email,  up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName,  
                               up.Email,  up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, 
                                                                 Email, UserTypeId, IsActive)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ImageLocation, @UserTypeId, @IsActive)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile u
                                        
                                        SET  u.FirebaseUserId = @FirebaseUserId,
                                             u.FirstName = @FirstName, 
                                             u.LastName = @LastName, 
                                             u.Email = @Email, 
                                             u.UserTypeId = @UserTypeId,
                                             u.IsActive = @IsActive
                                             //ut.Id = @UserTypeId,
                                         //    ut.Name = @Name
                                         //Join UserType ut ON u.UserTypeId = ut.Id
                                        WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);
                    //DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    //DbUtils.AddParameter(cmd, "@Name", userProfile.UserType.Name);

                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT up.Id as UserId, up.FirebaseUserId, 
                                up.FirstName, up.LastName, up.Email, 
                                up.UserTypeId,   ut.Id as UserTypeId, ut.Name
                            FROM UserProfile up 
                            JOIN UserType ut ON up.UserTypeId = ut.id
                           
                        ORDER BY up.DisplayName
                    ";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            //IsActive =  DbUtils.GetBoolean(reader, "IsActive"),


                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        });
                    }

                    reader.Close();

                    return users;
                }

            }
        }
        //public List<UserProfile> GetAllDeactivated()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                  SELECT up.Id as UserId, up.FirebaseUserId, 
        //                        up.FirstName, up.LastName, up.DisplayName, up.Email, 
        //                        up.CreateDateTime, up.ImageLocation,up.UserTypeId, up.isActive,  ut.Id as UserTypeId, ut.Name
        //                    FROM UserProfile up 
        //                    JOIN UserType ut ON up.UserTypeId = ut.id
        //                ORDER BY up.DisplayName
        //                    Where up.IsActive = false  

        //            ";

        //            var reader = cmd.ExecuteReader();

        //            var users = new List<UserProfile>();
        //            while (reader.Read())
        //            {
        //                users.Add(new UserProfile()
        //                {
        //                    Id = DbUtils.GetInt(reader, "UserId"),
        //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                    FirstName = DbUtils.GetString(reader, "FirstName"),
        //                    LastName = DbUtils.GetString(reader, "LastName"),
        //                    Email = DbUtils.GetString(reader, "Email"),
        //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
        //                    IsActive = DbUtils.GetBoolean(reader, "IsActive"),


        //                    UserType = new UserType()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
        //                        Name = DbUtils.GetString(reader, "Name")
        //                    }
        //                });
        //            }

        //            reader.Close();

        //            return users;
        //        }

        //    }
        //}
    }


}


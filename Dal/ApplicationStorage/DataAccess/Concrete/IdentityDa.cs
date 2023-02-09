using Dal.ApplicationStorage.DataAccess.Abstract;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.DatabaseModels;
using Models.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Concrete
{
    public class IdentityDa : IIdentityCustomDa
    {
        private readonly ApiContext _db;
        private static ILogger<ApiContext> _logger;

        public IdentityDa(ApiContext db,ILogger<ApiContext> logger)
        {
            _db = db;
            _logger = logger;

        }

        public async Task<bool> Register(RegisterDTO registerInfo)
        {
            try
            {

                User user = new User();

                user.Email = registerInfo.Email;
                user.FirstName = registerInfo.FirstName;
                user.LastName = registerInfo.LastName;
                user.Username = registerInfo.Username;
                user.Pass = registerInfo.Pass;
                user.CreatedOn = DateOnly.FromDateTime(DateTime.Now);

                _db.Users.Add(user);
                await _db.SaveChangesAsync();

                var userIdFromDb = await _db.Users.Where(x => x.Email.Equals(registerInfo.Email)).Select(x => x.UserId).FirstOrDefaultAsync();
                if (registerInfo.IsBusinessUser)
                {
                    _db.BusinessUsers.Add(new BusinessUser() { UserId = userIdFromDb });
                }
                else
                {
                    _db.Clients.Add(new Client()
                    {
                        UserId = userIdFromDb
                    });
                }

                await _db.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
        public async Task<LoginDTO> CheckLoginInformation(LoginDTO loginInfo)
        {
            try
            {
                var userFromDb = await _db.Users.Where(x => x.Email.Equals(loginInfo.Email)).FirstOrDefaultAsync();
                if(userFromDb != null)
                {
                    loginInfo.UserId = userFromDb.UserId;
                    loginInfo.ValidEmail = true;
                    if (userFromDb.Pass.Equals(loginInfo.Password))
                    {
                        loginInfo.ValidPassword = true;
                    }
                    else
                    {
                        loginInfo.ValidPassword = false;
                    }
                }
                else
                {
                    loginInfo.ValidEmail = false;
                }

                return loginInfo;
               

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                throw;
            }
        }
    }
}

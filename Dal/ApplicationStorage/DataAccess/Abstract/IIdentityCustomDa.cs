using Models.DatabaseModels;
using Models.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.ApplicationStorage.DataAccess.Abstract
{
    public interface IIdentityCustomDa
    {
        Task<bool> Register(RegisterDTO registerInfo);
        Task<LoginDTO> CheckLoginInformation(LoginDTO loginInfo);
    }
}

using Models.DataTransferObjects.Serach;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ViewModels
{
    public class SearchViewModel
    {
        public List<SearchLocationDTO> Locations { set; get; }
        public List<SearchBrandsDTO> Brands { set; get; }
    }
}

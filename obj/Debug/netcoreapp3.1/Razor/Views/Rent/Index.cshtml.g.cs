#pragma checksum "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8e4da4a535a20d26e985679c451165541c6d03fc"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Rent_Index), @"mvc.1.0.view", @"/Views/Rent/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Dario\Source\Repos\OCRent\Views\_ViewImports.cshtml"
using OCRent;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Dario\Source\Repos\OCRent\Views\_ViewImports.cshtml"
using OCRent.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8e4da4a535a20d26e985679c451165541c6d03fc", @"/Views/Rent/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"511791f281f465b3cc3a882da914de8f94bd6929", @"/Views/_ViewImports.cshtml")]
    public class Views_Rent_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<ContractModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
  
    ViewData["Title"] = $"Renting {@Model.car.brand} {@Model.car.model.model_name}";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("    <div class=\"container my-5\">\r\n        <div class=\"contract p-3\">\r\n            <h1>Rent-a-car contract</h1>\r\n            <div class=\"w-100 d-flex justify-content-between align-items-center px-5 pt-5 pb-2\">\r\n                <span><b>Start date</b>: ");
#nullable restore
#line 12 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                    Write(DateTime.Now);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n                <span><b>End date</b>: ");
#nullable restore
#line 13 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                  Write(DateTime.Today.AddDays(2).AddHours(7));

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Vehicle</b>: ");
#nullable restore
#line 16 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                 Write(Model.car.brand);

#line default
#line hidden
#nullable disable
            WriteLiteral(" ");
#nullable restore
#line 16 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                                  Write(Model.car.model.model_name);

#line default
#line hidden
#nullable disable
            WriteLiteral(" (");
#nullable restore
#line 16 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                                                               Write(Model.car.model.year);

#line default
#line hidden
#nullable disable
            WriteLiteral(")</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Client</b>: ");
#nullable restore
#line 19 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                Write(Model.client.f_name.ToUpper());

#line default
#line hidden
#nullable disable
            WriteLiteral(" ");
#nullable restore
#line 19 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                                               Write(Model.client.l_name.ToUpper());

#line default
#line hidden
#nullable disable
            WriteLiteral(" (");
#nullable restore
#line 19 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                                                                               Write(Model.client.username);

#line default
#line hidden
#nullable disable
            WriteLiteral(")</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Client contact</b>: ");
#nullable restore
#line 22 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                        Write(Model.client.email);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Daily rental price</b>: ");
#nullable restore
#line 25 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                            Write(Model.car.daily_rental_price);

#line default
#line hidden
#nullable disable
            WriteLiteral("&euro;</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Equipment</b>: Navigation (5&euro;)</span>\r\n            </div>\r\n            <div class=\"w-100 px-5 py-2\">\r\n                <span><b>Total price</b>: ");
#nullable restore
#line 31 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                      Write(@Model.car.daily_rental_price*3+5);

#line default
#line hidden
#nullable disable
            WriteLiteral("&euro;</span>\r\n            </div>\r\n            <span class=\"current_date\">");
#nullable restore
#line 33 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
                                  Write(DateTime.Now);

#line default
#line hidden
#nullable disable
            WriteLiteral("</span>\r\n            <button class=\"go-back\">Go back</button>\r\n            ");
#nullable restore
#line 35 "C:\Users\Dario\Source\Repos\OCRent\Views\Rent\Index.cshtml"
       Write(Html.ActionLink("Proceed to payment", "Payment", "Rent", null, new { @class = "proceed-to-payment text-center" }));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n        </div>\r\n    </div>\r\n");
            WriteLiteral(@"
<style>
    .contract {
        position: relative;
        width: 700px;
        min-height: 500px;
        background-color: white;
        border-radius: 5px;
        margin: auto auto;
    }

    .proceed-to-payment, .go-back {
        min-width: 250px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        background-color: #121d33;
        color: cornflowerblue;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
    }
    .go-back {
        right: auto;
        bottom: 20px;
        left: 20px;
    }
        .proceed-to-payment:hover, .go-back:hover {
            color: #121d33;
            background-color: cornflowerblue;
            box-shadow: 0 0 3px 2px cornflowerblue;
            border: none;
        }

    .current_date {
        position: absolute;
        top: 20px;
        right: 20px;
        background-color: #121d33;
        color: cornflowerblue;
        font-weight: bold;
        padding: 10px;
            WriteLiteral("\n        border-radius: 5px;\r\n    }\r\n</style>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<ContractModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
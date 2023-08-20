using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace BackEnd.Filter
{
    public class RoleAuthorizationFilter : IAuthorizationFilter
    {
        private readonly List<int> _allowedRoles;

        public RoleAuthorizationFilter(List<int> allowedRoles)
        {
            _allowedRoles = allowedRoles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var currentUser = context.HttpContext.Items["CurrentUser"] as UsuarioModel; // Replace with your user model type
            if (currentUser == null || !_allowedRoles.Contains(currentUser.RolId))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}

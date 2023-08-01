using System;
using Entities.Entities;

namespace BackEnd.Models
{
    public class JWTTokens
    {
        public string Token { get; set; } = null!;
        public Usuario currentUser { get; set; } = null!;
        public bool authState { get; set; } = false;
    }
}


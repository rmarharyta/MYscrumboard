using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MY_ScrumBoard.Models;
using MY_ScrumBoard.Services;
using System.Text;
using AuthenticationService = MY_ScrumBoard.Services.AuthenticationService;
using IAuthenticationService = MY_ScrumBoard.Services.IAuthenticationService;

namespace MY_ScrumBoard
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection RegisterSecretKeys(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<SecretKeys>().Bind(configuration.GetSection(SecretKeys.Position));

            return services;
        }
        public static IServiceCollection AddCrossOrigins(this IServiceCollection services)
        {
            var AllowAllOrigins = "_allowAllOrigins";
            //CORS - Cross-Origin Resource Sharing
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowAllOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("https://myscrumboardmanaging.netlify.app")
                                            .AllowAnyHeader()
                                            .AllowCredentials()
                                            .AllowAnyMethod();
                                  });
            });
            return services;
        }
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<CollaborationServices>();
            services.AddSingleton<IEncryptionService, EncryptionService>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<NotesServices>();
            services.AddScoped<PasswordServices>();
            services.AddScoped<ProjectServices>();
            services.AddScoped<ScrumServices>();
            services.AddScoped<UserServices>();
            services.AddSingleton<IUserClaimsMapper<User>, UserClaimsMapper>();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = configuration["JwtConfig:Issuer"],
                            ValidAudience = configuration["JwtConfig:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtConfig:Key"] ?? throw new InvalidOperationException("No JWT Key"))),
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                if (context.Request.Cookies.ContainsKey(CookieKeys.Token))
                                {
                                    context.Token = context.Request.Cookies[CookieKeys.Token];
                                }

                                return Task.CompletedTask;
                            }
                        };
                    });

            return services;
        }
    }
}

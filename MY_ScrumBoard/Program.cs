global using Microsoft.EntityFrameworkCore;
global using MY_ScrumBoard.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MY_ScrumBoard.Services;
using System.Text;

namespace MY_ScrumBoard
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCrossOrigins();
            builder.Services.AddMemoryCache();
            builder.Services.RegisterSecretKeys(builder.Configuration);
            builder.Services.RegisterServices();
            builder.Services.AddAuthorization();
            builder.Services.AddJwtAuthentication(builder.Configuration);

            // Add services to the container.
            builder.Services.AddControllers();

            //connect to MySQL 
            builder.Services.AddDbContext<ApplicationDbContext>(options => { options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("No connection string")); });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("_allowAllOrigins");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();


        }
    }
}

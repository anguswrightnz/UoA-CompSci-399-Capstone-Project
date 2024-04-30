using OTTER.Handler;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using OTTER.Data;

namespace OTTER;

public class Program
{
    public static void Main(string[] args)
    {
        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              policy =>
                              {
                                  policy.WithOrigins("http://localhost:5173");
                              });
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen();

        builder.Services.AddAuthentication().AddScheme<AuthenticationSchemeOptions, AdminHandler>("Authentication", null);

        builder.Services.AddDbContext<OTTERDBContext>(options => options.UseSqlite(builder.Configuration["OTTERConnection"]));

        builder.Services.AddControllers();

        builder.Services.AddScoped<IOTTERRepo, DBOTTERRepo>();

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("Admin", policy => policy.RequireClaim("Admin"));
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors(MyAllowSpecificOrigins);

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
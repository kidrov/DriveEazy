// Program.cs
using Confluent.Kafka;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using DAL;
using Microsoft.EntityFrameworkCore;
using UserService.DAL;
using UserService.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IUserService, UserServ>();

builder.Configuration.AddJsonFile("appsettings.json");
var configuration = builder.Configuration;

builder.Services.Configure<KafkaSettings>(configuration.GetSection("Kafka"));
builder.Services.AddSingleton(typeof(IKafkaProducer<,>), typeof(KafkaProducer<,>)); // Register the generic KafkaProducer

builder.Services.AddDbContext<UserDbContext>(op => { op.UseSqlServer(builder.Configuration["ConnectionStrings:MyConnectionString"]); });

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x =>
            x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

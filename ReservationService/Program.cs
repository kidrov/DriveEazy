using Microsoft.Extensions.Options;
using ReservationService;
using ReservationService.DAL;
using ReservationService.Services;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.Configure<ReservationDatabaseSettings>(
             builder.Configuration.GetSection(nameof(ReservationDatabaseSettings)));
builder.Configuration.Bind(nameof(ReservationDatabaseSettings), new ReservationDatabaseSettings());

builder.Services.AddSingleton<IReservationDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<ReservationDatabaseSettings>>().Value);

//builder.Services.AddSingleton<ReservationServices>();  // Add services to the container.


// Add services to the container.
builder.Services.AddScoped<IReservationRepo, ReservationRepo>();
builder.Services.AddScoped<IReservationServices, ReservationServices>();


builder.Services.AddControllers();
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
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

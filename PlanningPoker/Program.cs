using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PlanningPoker.Hubs;

namespace PlanningPoker
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseStaticFiles();
            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapHub<PokerHub>("/hub");

            app.Run();

        }

    }
}

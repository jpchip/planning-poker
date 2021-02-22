using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace planning_poker.Hubs
{
    public class PokerHub : Hub
    {
         public async Task NewMessage(long username, string message)
        {
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}
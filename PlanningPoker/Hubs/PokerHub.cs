using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace PlanningPoker.Hubs
{
    public class PokerHub : Hub
    {
         public async Task ReconcileUsers(List<string> userNames, string groupName)
        {
            await Clients.Group(groupName).SendAsync("usersReconciled", userNames);
        }

        public async Task SetScore(string userName, string groupName, int score)
        {
            await Clients.Group(groupName).SendAsync("scoreSet", userName, score);
        }

        public async Task Reveal(string userName, string groupName)
        {
            await Clients.Group(groupName).SendAsync("reveal", userName);
        }

        public async Task Reset(string userName, string groupName)
        {
            await Clients.Group(groupName).SendAsync("reset", userName);
        }

        public async Task AddToGroup(string userName, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("addedToGroup", userName, groupName);
        }

        public async Task RemoveFromGroup(string userName, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("removedFromGroup", userName, groupName);
        }

        public async Task Marco(string userName, string groupName)
        {
            await Clients.Group(groupName).SendAsync("polo", userName);
        }
    }
}
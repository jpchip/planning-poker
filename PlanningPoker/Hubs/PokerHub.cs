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

        public async Task AddToGroup(string userName, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("addedToGroup", $"{userName}({Context.ConnectionId}) has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string userName, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{userName} ({Context.ConnectionId}) has left the group {groupName}.");
        }
    }
}
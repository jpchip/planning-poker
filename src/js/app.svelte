<!-- App.svelte -->
<script lang='typescript'>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { toast } from '@zerodevx/svelte-toast';
  import { Poker } from "./poker";
  import { getRoomFromUrl } from './utils';
  const poker = Poker.getInstance();

  const toastOptions = {};
  let newUsername = '';
  let newRoom = getRoomFromUrl();

  let users: {username: string, score: number}[] = [];
  let scores: number[] = [1,2,3,5,8,13,21];
  let inGroup = false;
  let scoresVisible = false;

  poker.getConnection().on('addedToGroup', (username: string, groupname: string) => {
    toast.push(`${username} joined the room!`);
    users.push({username: username, score: 0});
    poker.reconcileUsers(users.map(u => u.username));
  });

  poker.getConnection().on('removedFromGroup', (username: string, groupname: string) => {
    toast.push(`${username} left the room!`);
    users.slice(users.findIndex(u => u.username === username));
    users = [...users];
  });

  window.addEventListener('beforeunload', function (e) {
    poker.removeFromGroup(poker.username, poker.groupName);
  });

  poker.getConnection().on('usersReconciled', (usernames: string[]) => {
    usernames.forEach(reconciledUsername => {
      const existingUser = users.find(u => u.username === reconciledUsername);
      if (!existingUser) {
        users.push({username: reconciledUsername, score: 0});
        users = [...users];
      }
    });
  });

  poker.getConnection().on('scoreSet', (username: string, score: number) => {
    toast.push(`${username} voted!`);
    const currentUser = users.find(u => u.username === username);
    if (currentUser) {
      currentUser.score = score;
    }
    users = [...users];
  });

  poker.getConnection().on('reveal', (username: string) => {
    toast.push(`${username} revealed!`);
    scoresVisible = !scoresVisible;
  });

  poker.getConnection().on('reset', (username: string) => {
    toast.push(`${username} reset!`);
    users.forEach(u => u.score = 0);
    scoresVisible = false;
  });

  function onSubmit() {
    poker.addToGroup(newUsername, newRoom);
    inGroup = true;
  }

  function setScore(score: number) {
    poker.setScore(score);
  }

  function reveal() {
    poker.reveal();
  }

  function reset() {
    poker.reset();
  }

</script>
  <style>

    th, td {
      text-align: center;
    }
  </style>

  <div class="container">
    {#if !inGroup}
    <form on:submit|preventDefault="{onSubmit}">
      <div class="mb-3">
        <label for="newUsername" class="form-label">User Name</label>
        <input type="text" class="form-control" id="newUsername" bind:value={newUsername} >
      </div>
      <div class="mb-3">
        <label for="newRoom" class="form-label">Room</label>
        <input type="text" class="form-control" id="newRoom" bind:value={newRoom}>
      </div>
      <button type="submit" class="btn btn-primary">Join</button>
    </form>
    {/if}

    {#if inGroup}
    <table class="table table-bordered mb-2">
      <thead>
        <tr>
          {#each users as user}
            <th>{user.username}</th>
          {/each}
          <th>Avg.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each users as user}
            <td>
              {#if scoresVisible}
                {user.score}
              {:else}
                {#if user.score > 0}
                  ?
                {:else}
                  -
                {/if}
              {/if}
            </td>
          {/each}
          <td class="table-success">{ (users.length > 0) ? users.reduce((total, b) => total + b.score, 0) / users.length : ''}</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-toolbar" role="toolbar" aria-label="Cards">
      <div class="btn-group me-2" role="group" aria-label="First group">
        {#each scores as score}
          <button type="button" on:click="{() => setScore(score)}" class="btn btn-outline-primary">{score}</button>
        {/each}
      </div>
      <div class="btn-group me-2" role="group" aria-label="Second group">
        <button type="button" class="btn btn-secondary" on:click="{() => reveal()}">Reveal</button>
        <button type="button" class="btn btn-danger">Reset</button>
      </div>
    </div>
    {/if}
  </div>

  <SvelteToast {toastOptions} />
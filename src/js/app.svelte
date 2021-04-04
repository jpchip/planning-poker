<!-- App.svelte -->
<script lang='typescript'>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { toast } from '@zerodevx/svelte-toast';
  import { Poker } from "./poker";
  import { getRoomFromUrl } from './utils';
  import Login from './components/Login.svelte';

  const poker = Poker.getInstance();

  const toastOptions = { duration: 2000 };
  let newRoom = getRoomFromUrl();

  let users: {username: string, score: number}[] = [];
  let scores: number[] = [1,2,3,5,8,13,21];
  let inGroup = false;
  let scoresVisible = false;

  poker.getConnection().on('addedToGroup', (username: string, groupname: string) => {
    if (username !== poker.username) {
      toast.push(`${username} joined the room!`);
    }
    users.push({username: username, score: 0});
    users = [...users];
    poker.reconcileUsers(users.map(u => u.username));
  });

  poker.getConnection().on('removedFromGroup', (username: string, groupname: string) => {
    toast.push(`${username} left the room!`);
    users.splice(users.findIndex(u => u.username === username), 1);
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
    if (username !== poker.username) {
      toast.push(`${username} voted!`);
    }
    const currentUser = users.find(u => u.username === username);
    if (currentUser) {
      currentUser.score = score;
    }
    users = [...users];
    if(users.every(u => u.score > 0)) {
      scoresVisible = true;
    }
  });

  poker.getConnection().on('reveal', (username: string) => {
    if (username !== poker.username) {
      toast.push(`${username} revealed!`);
    }
    scoresVisible = !scoresVisible;
  });

  poker.getConnection().on('reset', (username: string) => {
    if (username !== poker.username) {
      toast.push(`${username} reset!`);
    }
    users.forEach(u => u.score = 0);
    users = [...users];
    scoresVisible = false;
  });

  poker.getConnection().onclose((error) => {
    if(error) {
      toast.push(error.message);
    }
  });

  function handleLogin(event: any) {
    poker.addToGroup(event.detail.username, event.detail.room);
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
    <Login room={newRoom} on:login={handleLogin}></Login>
    {/if}

    {#if inGroup}
    <table class="table table-bordered my-2">
      
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
          <td class="table-success">
            {#if scoresVisible}
              { (users.length > 0) ? users.reduce((total, b) => total + b.score, 0) / users.length : ''}
            {:else}
                -
            {/if}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="btn-toolbar" role="toolbar" aria-label="Cards">
      <div class="btn-group me-2" role="group" aria-label="First group">
        {#each scores as score}
          <button type="button" on:click="{() => setScore(score)}" class="btn btn-outline-primary shadow-none">{score}</button>
        {/each}
      </div>
      <div class="btn-group me-2" role="group" aria-label="Second group">
        <button type="button" class="btn btn-secondary shadow-none" on:click="{() => reveal()}">Reveal</button>
        <button type="button" class="btn btn-danger shadow-none" on:click="{() => reset()}">Reset</button>
      </div>
    </div>
    {/if}
  </div>

  <SvelteToast {toastOptions} />
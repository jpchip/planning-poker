<!-- App.svelte -->
<script lang='typescript'>
  import { Poker } from "./poker";
  import { getRoomFromUrl } from './utils';
  const poker = Poker.getInstance();

  let username = '';
  let room = getRoomFromUrl();
  let users: {username: string, score: number}[] = [];
  let scores: number[] = [1,2,3,5,8,13,21];
  let message = '';
  let inGroup = false;

  poker.getConnection().on('addedToGroup', (m: string) => {
    message = m;
    users.push({username: username, score: 0});
    inGroup = true;
    poker.reconcileUsers(users.map(u => u.username));
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
    const currentUser = users.find(u => u.username === username);
    if (currentUser) {
      currentUser.score = score;
    }
    users = [...users];
  });

  function onSubmit() {
    poker.addToGroup(username, room);
  }

  function setScore(score: number) {
    poker.setScore(score);
  }

</script>
  <style>
    /* css will go here */
  </style>
  <div class="App">
    {#if !inGroup}
    <form on:submit|preventDefault="{onSubmit}">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="username" class="form-control" id="username" bind:value={username} >
      </div>
      <div class="mb-3">
        <label for="room" class="form-label">Room</label>
        <input type="room" class="form-control" id="room" bind:value={room}>
      </div>
      <button type="submit" class="btn btn-primary">Join</button>
    </form>
    {/if}
    <div>{message}</div>
    <table>
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
            <td>{user.score}</td>
          {/each}
          <td>{ (users.length > 0) ? users.reduce((total, b) => total + b.score, 0) / users.length : ''}</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-toolbar" role="toolbar" aria-label="Cards">
      <div class="btn-group me-2" role="group" aria-label="First group">
        {#each scores as score}
          <button type="button" on:click="{() => setScore(score)}" class="btn btn-primary">{score}</button>
        {/each}
      </div>
    </div>
  </div>
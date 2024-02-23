<!-- App.svelte -->
<script lang='typescript'>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { toast } from '@zerodevx/svelte-toast';
  import { Poker } from "./poker";
  import { getRoomFromUrl, setRoomToUrl } from './utils';
  import Login from './components/Login.svelte';
  import ScoreDisplay from './components/ScoreDisplay.svelte';
  import ScoreSelector from './components/ScoreSelector.svelte';
  import Header from './components/Header.svelte';

  const poker = Poker.getInstance();

  const toastOptions = { duration: 2000 };
  let newRoom = getRoomFromUrl();
  let newUsername = localStorage.getItem('planning-poker-user') || '';

  let users: {username: string, score: number}[] = [];
  let scores: number[] = [1,2,3,5,8,13,21];
  let inGroup = false;
  let scoresVisible = false;

  window.setInterval(() => {
    console.log('marco');
    poker.marco();
  }, 30000);

  poker.getConnection().onreconnecting((error) => {
      toast.push(`Connection lost due to error "${error}". Reconnecting.`);
  });

  poker.getConnection().onreconnected((connectionId) => {
      toast.push('Connection reestablished. Connected.');
  });

  poker.getConnection().on('addedToGroup', (username: string, groupname: string) => {
    if (username !== poker.username) {
      toast.push(`${username} joined the room!`);
    }
    const currentUser = users.find(u => u.username === username);
    if (!currentUser) {
      users.push({username: username, score: 0});
    }
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
      }
    });
    users = [...users];
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
    scoresVisible = true;
  });

  poker.getConnection().on('reset', (username: string) => {
    if (username !== poker.username) {
      toast.push(`${username} reset!`);
    }
    users.forEach(u => u.score = 0);
    users = [...users];
    scoresVisible = false;
  });

  poker.getConnection().on('polo', (username: string) => {
    if (username === poker.username) {
      console.log('polo');
    }
  });

  poker.getConnection().onclose((error) => {
    if(error) {
      toast.push(error.message);
    }
  });

  function handleLogin(event: any) {
    poker.addToGroup(event.detail.username, event.detail.room);
    setRoomToUrl(event.detail.room);
    localStorage.setItem('planning-poker-user', event.detail.username);
    inGroup = true;
  }

  function handleSetScore(event: any) {
    poker.setScore(event.detail.score);
  }

  function handleReveal() {
    poker.reveal();
  }

  function handleReset() {
    poker.reset();
  }

</script>
  <style>
  </style>

  <Header></Header>

  <div class="container mt-5">
    {#if !inGroup}
    <Login room={newRoom} username={newUsername} on:login={handleLogin}></Login>
    {/if}

    {#if inGroup}
    <ScoreDisplay users={users} scoresVisible={scoresVisible} />
    <ScoreSelector on:setScore={handleSetScore} on:reset={handleReset} on:reveal={handleReveal} />

    {/if}
  </div>

  <SvelteToast {toastOptions} />
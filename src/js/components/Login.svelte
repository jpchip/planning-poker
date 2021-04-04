<!-- login.svelte -->
<script lang='typescript'>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let username = '';
  export let room = '';


  function onSubmit() {
    dispatch('login', {
			username: username,
      room: room
		});
  }
</script>
  <style>
  </style>

<form class="mt-2" on:submit|preventDefault="{onSubmit}">
  <div class="mb-3">
    <label for="username" class="form-label">User Name</label>
    <input type="text" class="form-control" id="username" bind:value={username} >
  </div>
  <div class="mb-3">
    <label for="room" class="form-label">Room</label>
    <input type="text" class="form-control" id="room" bind:value={room}>
  </div>
  <button type="submit" class="btn btn-primary">Join</button>
</form>
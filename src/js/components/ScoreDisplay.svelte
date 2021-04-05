<!-- ScoreDisplay.svelte -->
<script lang='typescript'> 
    export let users: {username: string, score: number}[] = [];
    export let scoresVisible = false; 
  </script>
    <style> 
      th, td {
        text-align: center;
      }
    </style>
      <table class="table table-bordered my-2">     
        <thead>
          <tr>
            {#each users as user}
              <th>{user.username}</th>
            {/each}
            <th>Average</th>
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
                { (users.length > 0) ? (users.reduce((total, b) => total + b.score, 0) / users.length).toFixed(2) : ''}
              {:else}
                  -
              {/if}
            </td>
          </tr>
        </tbody>
      </table>
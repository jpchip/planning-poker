<!-- ScoreDisplay.svelte -->
<script lang='typescript'> 
    export let users: {username: string, score: number}[] = [];
    export let scoresVisible = false; 
  </script>
    <style> 
      th, td {
        text-align: center;
      }

      span[role=img][aria-label],
      span[role=img][aria-label] {
        position: relative;
      }

      span[role=img][aria-label]:focus::after,
      span[role=img][aria-label]:hover::after {
        position: absolute;
        display: block;
        z-index: 1;
        bottom: 1.5em;
        left: 0;
        max-width: 5em;
        padding: .5em .75em;
        border: .05em solid rgba(255,255,255,1);
        border-radius: .2em;
        box-shadow: .15em .15em .5em rgba(0,0,0,1);
        content: attr(aria-label);
        background-color: rgba(0,0,0,.85);
        color: rgba(255,255,255,1);
        font-size: 80%;
        animation: TOOLTIP .1s ease-out 1;
      }

      @media print {
        span[role=img][aria-label]::after {
          content: " (" attr(aria-label) ") ";
        }
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
                  <span role="img" aria-label="Score selected">🎴</span>
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
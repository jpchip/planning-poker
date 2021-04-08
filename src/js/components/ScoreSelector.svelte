<!-- ScoreSelector.svelte -->
<script lang='typescript'>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let scores: number[] = [1,2,3,5,8,13,21];
  
    function setScore(score: number) {
        dispatch('setScore', {
			score: score
		});
    }
  
    function reveal() {
        dispatch('reveal');
    }
  
    function reset() {
        dispatch('reset');
    }
  
  </script>
    <style>
    </style>

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
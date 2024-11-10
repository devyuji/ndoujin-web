<script lang="ts">

    interface PropsType {
        image: string;
    }

    let {image}: PropsType = $props()

    let imageLoaded = $state(false);
    let errorMessage = $state('');
</script>

<div class="w-full h-full bg-zinc-700">
    <div class={`h-[50rem] w-full bg-zinc-700 grid place-items-center ${imageLoaded ? "hidden": ""}`}>
        {#if errorMessage}
            <p class="text-center">{errorMessage}</p>
        {:else} <span>
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
        </span>
        {/if}
    </div>
    <img alt="" class="w-full h-full object-contain" loading="lazy" onerror={() => errorMessage = "image not loaded"}
         onload={() => imageLoaded = true}
         src={image}/>
</div>
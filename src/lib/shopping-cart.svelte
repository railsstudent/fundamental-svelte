<script lang="ts">
    let header = $state('Shopping List App');

    let items = $state<{ id: number, label: string }[]>([
        {
            id: 1,
            label: '10 Apples'
        },
        {
            id: 2,
            label: '20 Bananas'
        },
        {
            id: 3,
            label: '5 Oranges'
        },
        {
            id: 4,
            label: '15 Strawberries'
        }
    ]);
</script>

<h1>{ header }</h1>
<ul>
    {#each items as item (item.id)}
        <li>{ item.id } - { item.label }</li>
    {/each}
</ul>
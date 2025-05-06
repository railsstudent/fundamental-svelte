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

    let newItem = $state('');
    let newItemHigerPriority = $state(false);

    function saveItem() {
        if (newItem) {
            items.push({
                id: items.length + 1,
                label: newItem
            });
            newItem = '';
        }
    };
</script>

<h1>{ header }</h1>
<ul>
    {#each items as item (item.id)}
        <li>{ item.id } - { item.label }</li>
    {/each}
</ul>
<input
    type="text"
    placeholder="Add item"
    bind:value={newItem}
/>
<input type="checkbox" bind:checked={newItemHigerPriority} />Higher Priority
<button class="btn btn-primary" onclick="{saveItem}">Save Item</button>
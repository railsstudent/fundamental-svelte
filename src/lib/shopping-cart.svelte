<script lang="ts">
	let header = $state('Shopping List App');
	let newItem = $state('');
	let newItemHigerPriority = $state(false);

	let items = $state([
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

	function saveItem() {
		if (newItem) {
			items.push({
				id: items.length + 1,
				label: newItem
			});
			newItem = '';

			console.log('items in saveItem', items);
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		saveItem();
	}
</script>

<h1>{header}</h1>
<ul>
	{#each items as item (item.id)}
		<li>{item.id} - {item.label}</li>
	{/each}
</ul>
<form class="add-item-form" method="POST" onsubmit={handleSubmit}>
	<input id="newItem" name="newItem" type="text" placeholder="Add item" bind:value={newItem} />
	<label>
		<input
			id="higherPriority"
			name="higherPriority"
			type="checkbox"
			bind:checked={newItemHigerPriority}
		/>Higher Priority
	</label>
	<button class="btn btn-primary">Save Item</button>
</form>

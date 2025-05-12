<script lang="ts">
	import Icon from "@iconify/svelte";

	type Item = { id: number; label: string; purchased: boolean; higherPriority: boolean };

	let header = $state('Shopping List App');
	let newItem = $state('');
	let newItemHigherPriority = $state(false);
	let items = $state([] as Item[]);
	let isEditing = $state(false);

	function saveItem() {
		if (newItem) {
			items.push({
				id: items.length + 1,
				label: newItem,
				purchased: false,
				higherPriority: newItemHigherPriority
			});
			newItem = '';
			newItemHigherPriority = false;
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		saveItem();
	}

	function toggleEdit(value: boolean) {
		isEditing = value;
		newItem = '';
		newItemHigherPriority = false;
	}

	function togglePurchased(item: Item) {
		item.purchased = !item.purchased;
		newItem = '';
		newItemHigherPriority = false;
	}

	function deleteItem(id: number) {
	  items = items.filter(item => item.id !== id)
	}
</script>

<div class="header">
	<h1>{header}</h1>
	{#if isEditing}
		<button class="btn" onclick={() => toggleEdit(false)}>Cancel</button>
	{:else}
		<button class="btn btn-primary" onclick={() => toggleEdit(true)}>Add Item</button>
	{/if}
</div>

{#if isEditing}
	<form class="add-item-form" method="POST" onsubmit={handleSubmit}>
		<input id="newItem" name="newItem" type="text" placeholder="Add item" bind:value={newItem} />
		<label>
			<input
				id="higherPriority"
				name="higherPriority"
				type="checkbox"
				bind:checked={newItemHigherPriority}
			/>
			<span style:font-weight={newItemHigherPriority ? 'bold' : 'normal'}> Higher Priority</span>
		</label>
		<button class="btn btn-primary" disabled={newItem.length < 5}>Save Item</button>
	</form>
{/if}

{#if items.length > 0}
	<ul>
		{#each items as item (item.id)}
			<div class="list-item">
				<li class={[item.purchased && 'strikeout', item.higherPriority && 'priority']}>
					{item.id} - {item.label}
				</li>
				<button class="btn" onclick={() => togglePurchased(item)} aria-label="purchase an item">
					{#if !item.purchased}
						<Icon icon="ic:baseline-check" />
					{:else}
						<Icon icon="ic:baseline-close" />
					{/if}
				</button>

				<button class="btn btn-cancel" onclick={() => deleteItem(item.id)} aria-label="delete an item">
					<Icon icon="ic:baseline-remove" />
				</button>
			</div>
		{/each}
	</ul>
{:else}
	<p>Nothing to see here</p>
{/if}

<style>
	div.list-item {
		display: flex;
	}

	div.list-item > li {
		margin-right: 0.5rem;
	}

	div.list-item > button {
		margin-right: 0.25rem;
	}
</style>
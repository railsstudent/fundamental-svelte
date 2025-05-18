<script lang="ts">
	import Icon from '@iconify/svelte';

	type Item = { id: number; label: string; purchased: boolean; higherPriority: boolean };

	let header = $state('Shopping List App - Svelte');
	let newItem = $state('');

	let newItemHigherPriority = $state(false);
	let items = $state([] as Item[]);
	let reversed_items = $derived([...items].reverse());
	let num_items_purchased = $derived(
		items.reduce((acc, item) => acc + (item.purchased ? 1 : 0), 0)
	);
	let num_items_purchased_label = $derived.by(() => {
		const unit = num_items_purchased > 1 ? 'items' : 'item';
		return `${num_items_purchased} ${unit} purchased`;
	});

	let isEditing = $state(false);

	let highPriorityStyle = $derived.by(() => newItemHigherPriority ? 'bold' : 'normal');

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
		items = items.filter((item) => item.id !== id);
	}
</script>

<div class="header">
	<h1>{header}</h1>
	{#if isEditing}
		<button class="btn" onclick={() => toggleEdit(false)} aria-label="Cancel">
			<Icon icon="ic:outline-close" />
		</button>
	{:else}
		<button class="btn btn-primary" onclick={() => toggleEdit(true)} aria-label="Add Item">
			<Icon icon="ic:outline-add" />
		</button>
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
			<span style:font-weight={highPriorityStyle}> Higher Priority</span>
		</label>
		<button class="btn btn-primary" disabled={newItem.length < 5} aria-label="Save Item">
			<Icon icon="ic:outline-save" />
		</button>
	</form>
{/if}

{#if reversed_items.length > 0}
	<div class="header">
		{#if num_items_purchased > 0 && num_items_purchased < items.length}
			{num_items_purchased_label}
		{:else if num_items_purchased == 0}
			You have not purchased any items yet.
		{:else}
			You have bought everything in the shopping cart.
		{/if}
	</div>
	<ul>
		{#each reversed_items as item (item.id)}
			<div class="list-item">
				<li class={[item.purchased && 'strikeout', item.higherPriority && 'priority']}>
					{item.id} - {item.label}
				</li>
				<button class="btn" onclick={() => togglePurchased(item)} aria-label="purchase an item">
					<Icon icon={!item.purchased ? "ic:baseline-check" : "ic:baseline-close" } />
				</button>

				{#if !item.purchased}
					<button
						class="btn btn-cancel"
						onclick={() => deleteItem(item.id)}
						aria-label="delete an item"
					>
						<Icon icon="ic:baseline-remove" />
					</button>
				{/if}
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

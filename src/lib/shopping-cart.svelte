<script lang="ts">
	let header = $state('Shopping List App');
	let newItem = $state('');
	let newItemHigerPriority = $state(false);
	let items = $state([] as { id: number; label: string }[]);
	let isEditing = $state(false);

	function saveItem() {
		if (newItem) {
			items.push({
				id: items.length + 1,
				label: newItem
			});
			newItem = '';
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		saveItem();
	}

	function toggleEdit(value: boolean) {
		isEditing = value;
		newItem = '';
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
				bind:checked={newItemHigerPriority}
			/>Higher Priority
		</label>
		<button class="btn btn-primary">Save Item</button>
	</form>
{/if}

{#if items.length > 0}
	<ul>
		{#each items as item (item.id)}
			<li>{item.id} - {item.label}</li>
		{/each}
	</ul>
{:else}
	<p>Nothing to see here</p>
{/if}
<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import LocationForm from "./LocationForm.svelte";
    import ListLocations from "./ListLocations.svelte";
</script>
<Card title="Add A Location">
    <LocationForm />
</Card>
<Card title="Saved Locations">
    <ListLocations />
</Card>
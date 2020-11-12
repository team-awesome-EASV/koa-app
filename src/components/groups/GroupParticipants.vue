<template>
  <div class="q-pa-md row fit">
    <q-card class="my-card" bordered>
      <q-table
        class="my-sticky-header-table full-width"
        :data="group.participants"
        :columns="columns"
        row-key="name"
        flat
        dense
        :filter="filter"
        no-data-label="No one is attending this group yet"
        no-results-label="No one like that is a member of this group"
      >
        <template v-slot:top-left>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:top-right>
          <q-btn-group rounded>
            <q-btn
              :disabled="hasParticipants"
              color="accent"
              outline
              size="sm"
              rounded
              icon="mail"
              label="all participants"
            />
            <q-btn
              color="positive"
              outline
              size="sm"
              rounded
              icon="plus"
              label="Add participant"
            />
          </q-btn-group>
        </template>

        <template v-slot:body-cell-contact="props">
          <q-td :props="props">
            <div>
              <q-btn round size="xs" color="accent">
                <q-icon name="mail" color="white"></q-icon>
              </q-btn>
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "GroupParticipants",
  props: {
    group: { type: Object }
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "parent",
          align: "center",
          label: "Parent",
          field: "parent",
          sortable: true
        },

        {
          name: "contact",
          label: "Contact",
          field: "contact",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "remove",
          label: "Remove",
          field: "remove"
        }
      ]
    };
  },

  computed: {
    hasParticipants() {
      return this.group.participants.length <= 0;
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
}
</style>
